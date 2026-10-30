import nodemailer from "nodemailer";
import { getMongoClient } from "@/lib/mongodb";

const CC = ["waleed.wurfel@gmail.com", "hanzalamalek36@gmail.com"];

const MAX_PHOTOS = 10;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Photos are base64-encoded in the JSON body (compressed client-side)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parsePhotos(photos) {
  if (!Array.isArray(photos)) return [];
  return photos
    .slice(0, MAX_PHOTOS)
    .filter(
      (p) =>
        p &&
        typeof p.data === "string" &&
        ALLOWED_PHOTO_TYPES.includes(p.type),
    )
    .map((p, i) => ({
      filename:
        String(p.name || `photo-${i + 1}.jpg`).replace(/[^\w.\- ]/g, "_").slice(0, 100),
      contentType: p.type,
      content: Buffer.from(p.data, "base64"),
    }))
    .filter((p) => p.content.length > 0);
}

function buildEmailHtml(data, photoCount) {
  const rows = Object.entries(data)
    .filter(([k]) => k !== "formType" && k !== "submittedAt")
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 12px;background:#f4f6f9;font-weight:600;color:#183961;white-space:nowrap;border-bottom:1px solid #e8edf3;">
          ${k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
        </td>
        <td style="padding:8px 12px;color:#333;border-bottom:1px solid #e8edf3;">${v ? escapeHtml(v) : "—"}</td>
      </tr>`
    )
    .join("");

  const photoRow = photoCount
    ? `
      <tr>
        <td style="padding:8px 12px;background:#f4f6f9;font-weight:600;color:#183961;white-space:nowrap;border-bottom:1px solid #e8edf3;">Photos</td>
        <td style="padding:8px 12px;color:#333;border-bottom:1px solid #e8edf3;">${photoCount} attached</td>
      </tr>`
    : "";

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#183961;padding:24px 32px;">
        <h1 style="color:white;margin:0;font-size:20px;">New Form Submission — Webhomes</h1>
        <p style="color:#5aa6d1;margin:4px 0 0;font-size:14px;">${escapeHtml(data.formType || "")}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${rows}${photoRow}
      </table>
      <div style="background:#f4f6f9;padding:16px 32px;font-size:12px;color:#888;">
        Submitted at: ${new Date(data.submittedAt).toLocaleString()}
      </div>
    </div>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { photos: rawPhotos, ...fields } = req.body || {};
  const photos = parsePhotos(rawPhotos);
  const data = { ...fields, submittedAt: new Date().toISOString() };

  // 1 — Send email first
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Webhomes" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      cc: CC.join(", "),
      subject: `New Submission — ${data.formType || "Contact Form"}`,
      html: buildEmailHtml(data, photos.length),
      attachments: photos,
    });
  } catch (emailErr) {
    console.error("Email error:", emailErr);
    return res.status(500).json({ success: false, error: "Failed to send email." });
  }

  // 2 — Save to MongoDB (photos stored as binary alongside the submission)
  try {
    const client = await getMongoClient();
    const db = client.db("webhomes");
    await db.collection("submissions").insertOne(
      photos.length
        ? {
            ...data,
            photos: photos.map((p) => ({
              filename: p.filename,
              contentType: p.contentType,
              size: p.content.length,
              data: p.content,
            })),
          }
        : data,
    );
  } catch (dbErr) {
    console.error("DB error:", dbErr);
    // Email already sent — still return success but log the DB failure
  }

  return res.status(200).json({ success: true });
}
