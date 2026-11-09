import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Toast from "@/components/Toast";

const MAX_PHOTOS = 10;
const MAX_DIMENSION = 1280;
// Keeps the JSON payload under typical serverless request limits (~4.5MB)
const MAX_PAYLOAD_CHARS = 3_800_000;

const labelStyle = {
  display: "block",
  color: "white",
  fontSize: "clamp(11px, 0.9vw, 13px)",
  marginBottom: "4px",
  fontWeight: "500",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "white",
  border: "none",
  outline: "none",
  fontSize: "clamp(12px, 1vw, 14px)",
  color: "#333",
  fontFamily: "'Poppins', sans-serif",
  boxSizing: "border-box",
};

const checkboxStyle = {
  marginTop: "3px",
  flexShrink: 0,
  accentColor: "#5aa6d1",
  width: "15px",
  height: "15px",
  cursor: "pointer",
};

const checkboxTextStyle = {
  color: "white",
  fontSize: "clamp(11px, 0.85vw, 13px)",
  margin: 0,
  lineHeight: 1.55,
};

const legalItemStyle = {
  color: "rgba(255,255,255,0.75)",
  fontSize: "clamp(10px, 0.8vw, 11px)",
  lineHeight: 1.7,
};

const emptyForm = {
  address: "",
  name: "",
  phone: "",
  email: "",
  askingPrice: "",
};

const emptyConsents = {
  marketingSmsConsent: false,
  promotionalSmsConsent: false,
  agreedToTerms: false,
  agreedToPrivacy: false,
};

const consentItems = [
  {
    key: "marketingSmsConsent",
    text: "I consent to receive marketing text messages from WEB HOMES LLC regarding property opportunities, offers, and related services. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase.",
  },
  {
    key: "promotionalSmsConsent",
    text: "By checking this box, I consent to receive marketing and promotional messages including special offers, discounts, new product updates among others from WEB HOMES LLC at the phone number provided. Frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out",
  },
  {
    key: "agreedToTerms",
    text: (
      <>
        I agree to the{" "}
        <Link href="/terms-conditions" style={{ color: "#5aa6d1" }}>
          Terms and Conditions
        </Link>
        .
      </>
    ),
  },
  {
    key: "agreedToPrivacy",
    text: (
      <>
        I agree to the{" "}
        <Link href="/privacy-policy" style={{ color: "#5aa6d1" }}>
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
];

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CameraIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5aa6d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

// Resize + re-encode to JPEG so phone photos upload quickly over mobile data
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve({
        name: file.name.replace(/\.[^.]+$/, "") + ".jpg",
        type: "image/jpeg",
        dataUrl: canvas.toDataURL("image/jpeg", 0.72),
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read ${file.name}`));
    };
    img.src = url;
  });
}

export default function OfferHero() {
  const sectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [form, setForm] = useState(emptyForm);
  const [consents, setConsents] = useState(emptyConsents);
  const [photos, setPhotos] = useState([]);
  const [processingPhotos, setProcessingPhotos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (t) => setToast({ ...t, id: Date.now() });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleConsent = (e) =>
    setConsents((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

  const handlePhotos = async (e) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/"),
    );
    e.target.value = "";
    if (!files.length) return;

    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      showToast({ type: "error", message: `You can upload up to ${MAX_PHOTOS} photos.` });
      return;
    }

    setProcessingPhotos(true);
    try {
      const results = await Promise.allSettled(
        files.slice(0, room).map(compressImage),
      );
      const ok = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);

      let total = photos.reduce((sum, p) => sum + p.dataUrl.length, 0);
      const accepted = [];
      for (const p of ok) {
        if (total + p.dataUrl.length > MAX_PAYLOAD_CHARS) break;
        total += p.dataUrl.length;
        accepted.push({ ...p, id: `${Date.now()}-${Math.random()}` });
      }
      setPhotos((prev) => [...prev, ...accepted]);

      if (files.length > room || accepted.length < ok.length) {
        showToast({
          type: "error",
          message: `Some photos were skipped — up to ${MAX_PHOTOS} photos per submission.`,
        });
      } else if (ok.length < results.length) {
        showToast({ type: "error", message: "Some photos couldn't be read. Please try a different file." });
      }
    } finally {
      setProcessingPhotos(false);
    }
  };

  const removePhoto = (id) =>
    setPhotos((prev) => prev.filter((p) => p.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...Object.fromEntries(
            Object.entries(consents).map(([k, v]) => [k, v ? "Yes" : "No"]),
          ),
          formType: "Get My Offer",
          photos: photos.map((p) => ({
            name: p.name,
            type: p.type,
            data: p.dataUrl.split(",")[1],
          })),
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast({
          type: "success",
          message:
            "Thanks! We received your property details and will follow up with your offer range soon.",
        });
        setForm(emptyForm);
        setConsents(emptyConsents);
        setPhotos([]);
      } else {
        showToast({
          type: "error",
          message: "Failed to send. Please try again or call us directly.",
        });
      }
    } catch {
      showToast({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <section
        id="offer-form"
        ref={sectionRef}
        style={{ position: "relative", minHeight: "90vh", overflow: "hidden" }}
      >
        {/* Background image */}
        <Image
          src="/home-2.png"
          alt="Real estate background"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Dark overlay for legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.18)",
            zIndex: 1,
          }}
        />

        {/* Content grid */}
        <div
          className="hero-grid"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "clamp(40px, 5vw, 80px) clamp(20px, 6.5vw, 80px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            alignItems: "stretch",
            minHeight: "90vh",
          }}
        >
          {/* ── Left — intro text ── */}
          <div
            className={`hero-left${visible ? " contact-form-animate" : ""}`}
            style={{
              background: "rgba(255, 255, 255, 0.40)",
              borderRadius: "12px 0 0 12px",
              opacity: visible ? undefined : 0,
              transform: visible ? undefined : "translateX(-80px)",
              padding: "clamp(24px, 4vw, 52px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <h1
              className="offer-title"
              style={{
                color: "#183961",
                fontWeight: "900",
                fontSize: "clamp(24px, 3.4vw, 46px)",
                lineHeight: 1.35,
                letterSpacing: "1.5px",
                WebkitTextStroke: "3px white",
                paintOrder: "stroke fill",
                margin: "0 0 clamp(20px, 3vw, 36px)",
              }}
            >
              Get My Offer
            </h1>
            <p
              style={{
                color: "#ffffff",
                fontSize: "clamp(15px, 1.4vw, 20px)",
                lineHeight: 1.75,
                margin: "0 0 clamp(16px, 2vw, 24px)",
                fontWeight: "700",
                textShadow:
                  "0 1px 6px rgba(0,0,0,0.7), 0 2px 16px rgba(0,0,0,0.5)",
              }}
            >
              Tell us about your property and we&apos;ll review recent
              comparable sales to put together a no-obligation ballpark offer
              range — no pressure, no repairs needed.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 clamp(20px, 3vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                "We buy houses as-is",
                "Family-owned, working directly with you",
                "Close in as little as 25–30 days",
              ].map((t) => (
                <li
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "clamp(13px, 1.1vw, 16px)",
                    textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#5aa6d1",
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "auto" }}>
              <a href="tel:5733129899" className="offer-cta-btn offer-cta-primary">
                <PhoneIcon />
                Call (573) 312-9899
              </a>
            </div>
          </div>

          {/* ── Right — form ── */}
          <div
            className={visible ? "contact-image-animate" : undefined}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              opacity: visible ? undefined : 0,
              transform: visible ? undefined : "translateX(80px)",
            }}
          >
            {/* Decorative white frame */}
            <div
              style={{
                position: "absolute",
                top: "-18px",
                left: "18px",
                right: "-18px",
                bottom: "18px",
                border: "4px solid rgba(255,255,255,0.9)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Form card */}
            <form
              onSubmit={handleSubmit}
              style={{
                position: "relative",
                zIndex: 1,
                backgroundColor: "#183961",
                borderRadius: "0 12px 12px 0",
                padding: "clamp(20px, 3vw, 36px)",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "clamp(16px, 1.6vw, 22px)",
                  lineHeight: 1.35,
                  margin: "0 0 clamp(16px, 2vw, 24px)",
                }}
              >
                Submit your property details to get your no-obligation offer.
              </h2>

              {/* Property Address */}
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="offer-address" style={labelStyle}>Property Address</label>
                <input
                  id="offer-address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, City, State, ZIP"
                  autoComplete="street-address"
                  required
                  style={inputStyle}
                />
              </div>

              {/* Full Name */}
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="offer-name" style={labelStyle}>Seller&apos;s Full Name</label>
                <input
                  id="offer-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  style={inputStyle}
                />
              </div>

              {/* Phone + Email */}
              <div
                className="form-row-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <label htmlFor="offer-phone" style={labelStyle}>Phone Number</label>
                  <input
                    id="offer-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="offer-email" style={labelStyle}>Email Address</label>
                  <input
                    id="offer-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Asking Price */}
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="offer-price" style={labelStyle}>Asking Price</label>
                <input
                  id="offer-price"
                  name="askingPrice"
                  inputMode="decimal"
                  value={form.askingPrice}
                  onChange={handleChange}
                  placeholder="$"
                  required
                  style={inputStyle}
                />
              </div>

              {/* Photos */}
              <div style={{ marginBottom: "14px" }}>
                <span style={labelStyle}>
                  Property Photos{" "}
                  <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: "400" }}>
                    (optional, up to {MAX_PHOTOS})
                  </span>
                </span>
                <input
                  ref={fileInputRef}
                  id="offer-photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotos}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="offer-photos"
                  className="offer-upload"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "12px",
                    border: "2px dashed rgba(90,166,209,0.7)",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "white",
                    fontSize: "clamp(12px, 1vw, 14px)",
                    fontWeight: "500",
                    cursor: photos.length >= MAX_PHOTOS ? "not-allowed" : "pointer",
                    opacity: photos.length >= MAX_PHOTOS ? 0.5 : 1,
                  }}
                >
                  <CameraIcon />
                  {processingPhotos
                    ? "Preparing photos…"
                    : photos.length
                      ? `Add more photos (${photos.length}/${MAX_PHOTOS})`
                      : "Tap to upload photos"}
                </label>

                {photos.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
                      gap: "8px",
                      marginTop: "10px",
                    }}
                  >
                    {photos.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          position: "relative",
                          aspectRatio: "1 / 1",
                          overflow: "hidden",
                          border: "2px solid rgba(255,255,255,0.85)",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.dataUrl}
                          alt={p.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(p.id)}
                          aria-label={`Remove ${p.name}`}
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "rgba(4,15,32,0.8)",
                            color: "white",
                            fontSize: "14px",
                            lineHeight: "20px",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Consent checkboxes */}
              {consentItems.map((item, i) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: i === consentItems.length - 1 ? "8px" : 0,
                  }}
                >
                  <input
                    id={`offer-${item.key}`}
                    type="checkbox"
                    name={item.key}
                    checked={consents[item.key]}
                    onChange={handleConsent}
                    style={checkboxStyle}
                  />
                  <label htmlFor={`offer-${item.key}`} style={checkboxTextStyle}>
                    {item.text}
                  </label>
                </div>
              ))}

              {/* Legal */}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  paddingTop: "10px",
                  marginBottom: "12px",
                }}
              >
                <strong
                  style={{
                    color: "white",
                    fontSize: "clamp(11px, 0.9vw, 13px)",
                  }}
                >
                  Legal
                </strong>
                <ul
                  style={{
                    margin: "6px 0 0",
                    paddingLeft: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  {[
                    "Message and Data rates may apply.",
                    "Message frequency varies based on ongoing communication.",
                    "Reply HELP for help or STOP to opt out.",
                    "Your mobile information and SMS consent will not be sold, rented, or shared with third parties or affiliates for marketing or promotional purposes.",
                  ].map((t) => (
                    <li key={t} style={legalItemStyle}>
                      {t}
                    </li>
                  ))}
                  <li style={legalItemStyle}>
                    <Link href="/privacy-policy" style={{ color: "#5aa6d1" }}>
                      Privacy Page
                    </Link>
                    : Learn how WEB HOMES LLC collects, uses, and protects your
                    information.
                  </li>
                  <li style={legalItemStyle}>
                    <Link href="/terms-conditions" style={{ color: "#5aa6d1" }}>
                      Terms and Conditions Page
                    </Link>
                    : Review the terms governing use of our services and SMS
                    communications.
                  </li>
                </ul>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || processingPhotos}
                style={{
                  backgroundColor: "#5aa6d1",
                  color: "white",
                  border: "none",
                  padding: "clamp(12px, 1.2vw, 15px) 24px",
                  fontWeight: "700",
                  fontSize: "clamp(12px, 1vw, 14px)",
                  letterSpacing: "0.8px",
                  cursor: loading || processingPhotos ? "not-allowed" : "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  width: "100%",
                  textTransform: "uppercase",
                  transition: "background-color 0.2s",
                  opacity: loading || processingPhotos ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor = "#0e2747";
                }}
                onMouseLeave={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor = "#5aa6d1";
                }}
              >
                {loading ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ animation: "spin 0.8s linear infinite" }}
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Get My Offer"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
