import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Toast from "@/components/Toast";

export default function ContactForm() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postal: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "Contact Page" }),
      });
      const json = await res.json();
      if (json.success) {
        setToast({
          type: "success",
          message: "Your message has been sent! We'll be in touch soon.",
        });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          region: "",
          postal: "",
          message: "",
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
        style={{
          backgroundColor: "#F0F0F0",
          padding: "clamp(48px, 7vw, 96px) clamp(20px, 6.5vw, 80px)",
          overflow: "hidden",
        }}
      >
        <div
          ref={ref}
          className="contact-grid"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            alignItems: "stretch",
          }}
        >
          {/* Form card */}
          <div
            className={visible ? "contact-form-animate" : undefined}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px 0 0 12px",
              opacity: visible ? undefined : 0,
              transform: visible ? undefined : "translateX(-80px)",
              padding: "clamp(28px, 4vw, 52px)",
              boxShadow: "0 4px 32px rgba(24, 57, 97, 0.08)",
            }}
          >
            <h2
              style={{
                color: "#183961",
                fontWeight: "800",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                margin: "0 0 6px",
                lineHeight: 1.2,
              }}
            >
              Contact Us
            </h2>
            <p
              style={{
                color: "#5aa6d1",
                fontWeight: "600",
                fontSize: "clamp(13px, 1.1vw, 16px)",
                margin: "0 0 clamp(20px, 2.5vw, 32px)",
              }}
            >
              Let us help you sell your home!
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(14px, 1.8vw, 20px)",
              }}
            >
              <div
                className="form-row-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(12px, 1.5vw, 16px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label style={labelStyle}>First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    type="text"
                    style={inputStyle}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label style={labelStyle}>Last Name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    type="text"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={labelStyle}>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  style={inputStyle}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={labelStyle}>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  style={inputStyle}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={labelStyle}>Property Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  type="text"
                  style={inputStyle}
                />
              </div>
              <div
                className="form-row-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(12px, 1.5vw, 16px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label style={labelStyle}>City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    type="text"
                    style={inputStyle}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label style={labelStyle}>Region / State / Province</label>
                  <input
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    type="text"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={labelStyle}>Postal / Zip code</label>
                <input
                  name="postal"
                  value={form.postal}
                  onChange={handleChange}
                  type="text"
                  style={inputStyle}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={labelStyle}>
                  Tell us about your property and your goals
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                />
              </div>

              <ConsentBlock />

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="contact-submit-btn"
                  style={{
                    ...submitStyle,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? <Spinner /> : "Submit"}
                </button>
              </div>
            </form>
          </div>

          {/* Image */}
          <div
            className={visible ? "contact-image-animate" : undefined}
            style={{
              position: "relative",
              borderRadius: "0 12px 12px 0",
              overflow: "hidden",
              minHeight: "clamp(320px, 40vw, 560px)",
              opacity: visible ? undefined : 0,
              transform: visible ? undefined : "translateX(80px)",
            }}
          >
            <Image
              src="/home-3.png"
              alt="Webhomes Contact"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Spinner() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
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
    </span>
  );
}

function ConsentBlock() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <input type="checkbox" defaultChecked={false} style={checkboxStyle} />
        <p style={checkLabelStyle}>
          By submitting this form, you consent to receive SMS messages and/or
          emails and/or calls from Webhomes LLC. Message frequency varies. To
          unsubscribe, follow the instructions provided in our communications.
          Msg &amp; data rates may apply for SMS. Your information is secure and
          will not be sold to third parties. Text HELP for HELP, text STOP to
          cancel.
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <input type="checkbox" defaultChecked={false} style={checkboxStyle} />
        <p style={checkLabelStyle}>
          I agree to the{" "}
          <Link href="/terms-conditions" style={linkStyle}>
            Terms and Conditions
          </Link>
          .
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <input type="checkbox" defaultChecked={false} style={checkboxStyle} />
        <p style={checkLabelStyle}>
          I agree to the{" "}
          <Link href="/privacy-policy" style={linkStyle}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div
        style={{
          borderTop: "1px solid #e8edf3",
          paddingTop: "clamp(10px, 1.2vw, 14px)",
        }}
      >
        <strong
          style={{ color: "#183961", fontSize: "clamp(11px, 0.9vw, 13px)" }}
        >
          Legal
        </strong>
        <ul
          style={{
            margin: "6px 0 0",
            paddingLeft: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          {[
            "Message and Data rates may apply.",
            "Message frequency varies based on ongoing conversational activity.",
            "Text HELP for help or STOP to cancel.",
            "Your mobile information will not be sold or shared with third parties for promotional or marketing purposes.",
          ].map((t) => (
            <li key={t} style={legalItemStyle}>
              {t}
            </li>
          ))}
          <li style={legalItemStyle}>
            <Link href="/privacy-policy" style={linkStyle}>
              Privacy Page
            </Link>
            : How we safeguard your info and how we intend to use it.
          </li>
          <li style={legalItemStyle}>
            <Link href="/terms-conditions" style={linkStyle}>
              Terms and Conditions Page
            </Link>
            : Legal mumbo jumbo that is really important.
          </li>
        </ul>
      </div>
    </>
  );
}

const labelStyle = {
  color: "#183961",
  fontWeight: "600",
  fontSize: "clamp(12px, 0.95vw, 14px)",
};
const inputStyle = {
  border: "1px solid #d0d7e2",
  borderRadius: "5px",
  padding: "clamp(8px, 1vw, 11px) 12px",
  fontSize: "clamp(12px, 0.95vw, 14px)",
  color: "#333",
  outline: "none",
  fontFamily: "Poppins, sans-serif",
  width: "100%",
  boxSizing: "border-box",
};
const submitStyle = {
  backgroundColor: "#183961",
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "clamp(13px, 1.1vw, 15px)",
  padding: "clamp(10px, 1.2vw, 14px) clamp(28px, 3vw, 40px)",
  border: "none",
  borderRadius: "6px",
  fontFamily: "Poppins, sans-serif",
  transition: "background-color 0.2s ease",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};
const checkboxStyle = {
  marginTop: "3px",
  accentColor: "#183961",
  width: "15px",
  height: "15px",
  flexShrink: 0,
  cursor: "pointer",
};
const checkLabelStyle = {
  color: "#555",
  fontSize: "clamp(11px, 0.9vw, 13px)",
  lineHeight: 1.6,
  margin: 0,
};
const linkStyle = { color: "#5aa6d1", textDecoration: "underline" };
const legalItemStyle = {
  color: "#666",
  fontSize: "clamp(10px, 0.85vw, 12px)",
  lineHeight: 1.7,
};
