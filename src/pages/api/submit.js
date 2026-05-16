import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

const CC = ["waleed.wurfel@gmail.com", "hanzalamalek36@gmail.com"];

function buildEmailHtml(data) {
  const rows = Object.entries(data)
    .filter(([k]) => k !== "formType" && k !== "submittedAt")
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 12px;background:#f4f6f9;font-weight:600;color:#183961;white-space:nowrap;border-bottom:1px solid #e8edf3;">
          ${k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
        </td>
        <td style="padding:8px 12px;color:#333;border-bottom:1px solid #e8edf3;">${v || "—"}</td>
      </tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#183961;padding:24px 32px;">
        <h1 style="color:white;margin:0;font-size:20px;">New Form Submission — Webhomes</h1>
        <p style="color:#5aa6d1;margin:4px 0 0;font-size:14px;">${data.formType}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-top:0;">
        ${rows}
      </table>
      <div style="background:#f4f6f9;padding:16px 32px;font-size:12px;color:#888;">
        Submitted at: ${new Date(data.submittedAt).toLocaleString()}
      </div>
    </div>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const data = { ...req.body, submittedAt: new Date().toISOString() };

  try {
    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("webhomes");
    await db.collection("submissions").insertOne(data);

    // Send email
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
      html: buildEmailHtml(data),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
