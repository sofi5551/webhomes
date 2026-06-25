import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Toast from "@/components/Toast";

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

export default function HeroSection() {
  const sectionRef = useRef(null);
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

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    region: "",
    postal: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "Home — Hero Form" }),
      });
      const json = await res.json();
      if (json.success) {
        setToast({
          type: "success",
          message:
            "Your request has been sent! We'll reach out with a cash offer soon.",
        });
        setForm({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          region: "",
          postal: "",
        });
      } else {
        setToast({
          type: "error",
          message: "Failed to send. Please try again or call us directly.",
        });
      }
    } catch {
      setToast({
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
          key={Date.now()}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <section
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
          {/* ── Left — welcome text ── */}
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
              style={{
                color: "#183961",
                fontWeight: "900",
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: 1.35,
                letterSpacing: "2px",
                WebkitTextStroke: "3px white",
                paintOrder: "stroke fill",
                margin: "0 0 clamp(20px, 3vw, 36px)",
              }}
            >
              Welcome to
              <br />
              Webhomes
            </h1>
            <p
              style={{
                color: "#ffffff",
                fontSize: "clamp(15px, 1.4vw, 20px)",
                lineHeight: 1.75,
                margin: 0,
                fontWeight: "700",
                textShadow:
                  "0 1px 6px rgba(0,0,0,0.7), 0 2px 16px rgba(0,0,0,0.5)",
              }}
            >
              We&apos;re a real estate solutions company committed to making
              home selling simple, stress-free, and fast.
            </p>
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
                Let us make a free, cash offer on your house.
              </h2>

              {/* Name + Phone */}
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
                  <label style={labelStyle}>Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* Property Address */}
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>Property Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* City + Region */}
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
                  <label style={labelStyle}>City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Region/State/Province</label>
                  <input
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    placeholder="Region/State/Province"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Postal */}
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>Postal / Zip code</label>
                <input
                  name="postal"
                  value={form.postal}
                  onChange={handleChange}
                  placeholder="Postal / Zip code"
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked={false}
                  style={{
                    marginTop: "3px",
                    flexShrink: 0,
                    accentColor: "#5aa6d1",
                    width: "15px",
                    height: "15px",
                    cursor: "pointer",
                  }}
                />
                <p
                  style={{
                    color: "white",
                    fontSize: "clamp(11px, 0.85vw, 13px)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  By submitting this form, you consent to receive SMS messages
                  and/or emails and/or calls from Webhomes LLC. Message
                  frequency varies. To unsubscribe, follow the instructions
                  provided in our communications. Msg &amp; data rates may apply
                  for SMS. Your information is secure and will not be sold to
                  third parties. Text HELP for HELP, text STOP to cancel.
                </p>
              </div>

              {/* Checkbox — Terms */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked={false}
                  style={{
                    marginTop: "3px",
                    flexShrink: 0,
                    accentColor: "#5aa6d1",
                    width: "15px",
                    height: "15px",
                    cursor: "pointer",
                  }}
                />
                <p
                  style={{
                    color: "white",
                    fontSize: "clamp(11px, 0.85vw, 13px)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  I agree to the{" "}
                  <Link href="/terms-conditions" style={{ color: "#5aa6d1" }}>
                    Terms and Conditions
                  </Link>
                  .
                </p>
              </div>

              {/* Checkbox — Privacy */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked={false}
                  style={{
                    marginTop: "3px",
                    flexShrink: 0,
                    accentColor: "#5aa6d1",
                    width: "15px",
                    height: "15px",
                    cursor: "pointer",
                  }}
                />
                <p
                  style={{
                    color: "white",
                    fontSize: "clamp(11px, 0.85vw, 13px)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  I agree to the{" "}
                  <Link href="/privacy-policy" style={{ color: "#5aa6d1" }}>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

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
                    "Message frequency varies based on ongoing conversational activity.",
                    "Text HELP for help or STOP to cancel.",
                    "Your mobile information will not be sold or shared with third parties for promotional or marketing purposes.",
                  ].map((t) => (
                    <li
                      key={t}
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "clamp(10px, 0.8vw, 11px)",
                        lineHeight: 1.7,
                      }}
                    >
                      {t}
                    </li>
                  ))}
                  <li
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "clamp(10px, 0.8vw, 11px)",
                      lineHeight: 1.7,
                    }}
                  >
                    <Link href="/privacy-policy" style={{ color: "#5aa6d1" }}>
                      Privacy Page
                    </Link>
                    : How we safeguard your info and how we intend to use it.
                  </li>
                  <li
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "clamp(10px, 0.8vw, 11px)",
                      lineHeight: 1.7,
                    }}
                  >
                    <Link href="/terms-conditions" style={{ color: "#5aa6d1" }}>
                      Terms and Conditions Page
                    </Link>
                    : Legal mumbo jumbo that is really important.
                  </li>
                </ul>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#5aa6d1",
                  color: "white",
                  border: "none",
                  padding: "clamp(12px, 1.2vw, 15px) 24px",
                  fontWeight: "700",
                  fontSize: "clamp(12px, 1vw, 14px)",
                  letterSpacing: "0.8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  width: "100%",
                  textTransform: "uppercase",
                  transition: "background-color 0.2s",
                  opacity: loading ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor = "#183961";
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
                  "Get My Free Cash Offer"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
