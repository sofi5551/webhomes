import { useEffect, useState } from "react";

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" />
    <polyline points="8 12 11 15 16 9" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export default function Toast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  const isSuccess = type === "success";
  const bg = isSuccess ? "#16a34a" : "#dc2626";

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.max(0, p - 2));
    }, 100);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(progressTimer);
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        minWidth: "300px",
        maxWidth: "380px",
        backgroundColor: bg,
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        overflow: "hidden",
        transform: visible ? "translateX(0)" : "translateX(calc(100% + 32px))",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
      }}
    >
      {/* Content */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px 18px" }}>
        <div style={{ flexShrink: 0, marginTop: "1px" }}>
          {isSuccess ? <CheckIcon /> : <ErrorIcon />}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "white", fontWeight: "700", fontSize: "14px", margin: "0 0 2px", fontFamily: "Poppins, sans-serif" }}>
            {isSuccess ? "Success!" : "Something went wrong"}
          </p>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", margin: 0, lineHeight: 1.5, fontFamily: "Poppins, sans-serif" }}>
            {message}
          </p>
        </div>
        <button
          onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "18px", lineHeight: 1, padding: "0", flexShrink: 0 }}
        >
          ×
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.25)" }}>
        <div
          style={{
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.7)",
            width: `${progress}%`,
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
