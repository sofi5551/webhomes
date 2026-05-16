import { useEffect, useRef, useState } from "react";

const PhoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const OfferIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const DollarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const steps = [
  {
    icon: <PhoneIcon />,
    step: "Step 1",
    title: "Contact Us",
    desc: "Get an offer now! Contact us by phone, email or by submitting the above form. Don't worry, this won't cost you a thing!",
  },
  {
    icon: <OfferIcon />,
    step: "Step 2",
    title: "Get Your Offer",
    desc: "We will review your property and how it fits in our buy box. Once we have done our analysis, we will send the offer your way. And don't worry, this is a free, no obligation offer!",
  },
  {
    icon: <DollarIcon />,
    step: "Step 3",
    title: "Get Paid!",
    desc: "Once the deal has been finalized we will send it to our closing agents and pick your closing date. You'll get paid, and that's it!",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F0F0F0",
        padding: "clamp(48px, 6vw, 88px) clamp(16px, 4vw, 48px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(36px, 5vw, 60px)",
        }}
      >
        <h2
          style={{
            color: "#183961",
            fontWeight: "800",
            fontSize: "clamp(26px, 4vw, 48px)",
            letterSpacing: "3px",
            margin: "0 0 10px",
            textTransform: "uppercase",
          }}
        >
          How It Works
        </h2>
        <p
          style={{
            color: "#5aa6d1",
            fontWeight: "700",
            fontSize: "clamp(14px, 1.4vw, 18px)",
            margin: "0 0 16px",
          }}
        >
          Skip the hassle, sell with us!
        </p>
        <p
          style={{
            color: "#555",
            fontSize: "clamp(13px, 1.1vw, 16px)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          We buy homes as-is, directly from homeowners.
          <br />
          We have an extensive network of cash buyers, so you don&apos;t have to worry about a thing!
        </p>
      </div>

      {/* Cards */}
      <div
        className="hiw-grid"
        style={{
          maxWidth: "1260px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(16px, 2.5vw, 32px)",
        }}
      >
        {steps.map((s) => (
          <div
            key={s.step}
            className="hiw-card"
            style={{
              backgroundColor: "#F0F0F0",
              borderRadius: "20px",
              border: "2.5px solid #d0d0d0",
              padding: "clamp(18px, 2.2vw, 28px) clamp(16px, 2vw, 26px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                backgroundColor: "#5aa6d1",
                borderRadius: "50%",
                width: "clamp(56px, 5vw, 72px)",
                height: "clamp(56px, 5vw, 72px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "clamp(16px, 2vw, 24px)",
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>

            {/* Step label */}
            <p
              style={{
                color: "#183961",
                fontWeight: "700",
                fontSize: "clamp(14px, 1.3vw, 18px)",
                margin: "0 0 8px",
              }}
            >
              {s.step}
            </p>

            {/* Title */}
            <p
              style={{
                color: "#5aa6d1",
                fontWeight: "700",
                fontSize: "clamp(15px, 1.4vw, 20px)",
                margin: "0 0 clamp(12px, 1.5vw, 20px)",
              }}
            >
              {s.title}
            </p>

            {/* Description */}
            <p
              style={{
                color: "#555",
                fontSize: "clamp(13px, 1vw, 15px)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
