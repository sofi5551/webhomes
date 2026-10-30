import { useEffect, useRef, useState } from "react";

function useReveal() {
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

  return [ref, {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  }];
}

// Matches the "How It Works" heading on the home page
function SectionHeader({ title, subtitle, children }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 60px)" }}>
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
        {title}
      </h2>
      <p
        style={{
          color: "#5aa6d1",
          fontWeight: "700",
          fontSize: "clamp(14px, 1.4vw, 18px)",
          margin: children ? "0 0 16px" : 0,
        }}
      >
        {subtitle}
      </p>
      {children && (
        <p
          style={{
            color: "#555",
            fontSize: "clamp(13px, 1.1vw, 16px)",
            lineHeight: 1.7,
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          {children}
        </p>
      )}
    </div>
  );
}

const iconCircleStyle = {
  backgroundColor: "#5aa6d1",
  borderRadius: "50%",
  width: "clamp(56px, 5vw, 72px)",
  height: "clamp(56px, 5vw, 72px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "clamp(16px, 2vw, 24px)",
  flexShrink: 0,
};

const cardStyle = {
  backgroundColor: "#F0F0F0",
  borderRadius: "20px",
  border: "2.5px solid #d0d0d0",
  padding: "clamp(18px, 2.2vw, 28px) clamp(16px, 2vw, 26px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const svgProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "white",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const HomeIcon = () => (
  <svg {...svgProps}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const WrenchIcon = () => (
  <svg {...svgProps}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const SearchIcon = () => (
  <svg {...svgProps}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChartIcon = () => (
  <svg {...svgProps}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const UsersIcon = () => (
  <svg {...svgProps}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FileIcon = () => (
  <svg {...svgProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const CheckIcon = () => (
  <svg {...svgProps}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const KeyIcon = () => (
  <svg {...svgProps}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

/* ── About The Web Homes ─────────────────────── */

const highlights = [
  { icon: <HomeIcon />, title: "We Buy As-Is", desc: "Including properties that need repairs." },
  { icon: <WrenchIcon />, title: "Acquire & Renovate", desc: "We acquire and renovate properties." },
  { icon: <SearchIcon />, title: "Tour & Evaluate", desc: "We tour properties that need repairs." },
  { icon: <ChartIcon />, title: "Fair, Data-Driven", desc: "We review comps and condition before making an offer." },
  { icon: <UsersIcon />, title: "Work Directly", desc: "An offer and timeline that works for you." },
];

export function AboutWebHomes() {
  const [ref, reveal] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#ffffff",
        padding: "clamp(48px, 6vw, 88px) clamp(16px, 4vw, 48px)",
        ...reveal,
      }}
    >
      <SectionHeader title="About The Web Homes" subtitle="A family-owned real estate investment group">
        We are a family-owned real estate investment group focused on
        acquiring houses, including properties that need repairs or
        renovations. We look for properties where renovations can add value
        over time and work directly with homeowners to explore a
        straightforward sale.
      </SectionHeader>

      <div className="offer-about-row">
        {highlights.map((h) => (
          <div key={h.title} className="offer-about-item">
            <div
              style={{
                width: "clamp(52px, 4.4vw, 62px)",
                height: "clamp(52px, 4.4vw, 62px)",
                backgroundColor: "#183961",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
                flexShrink: 0,
              }}
            >
              {h.icon}
            </div>
            <p
              style={{
                color: "#183961",
                fontWeight: "700",
                fontSize: "clamp(13px, 1.1vw, 16px)",
                margin: "0 0 4px",
                lineHeight: 1.3,
              }}
            >
              {h.title}
            </p>
            <p
              style={{
                color: "#555",
                fontSize: "clamp(12px, 0.95vw, 14px)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {h.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Our Buying Areas ────────────────────────── */

const states = [
  { code: "FL", name: "Florida" },
  { code: "TN", name: "Tennessee" },
  { code: "AL", name: "Alabama" },
  { code: "TX", name: "Texas" },
  { code: "GA", name: "Georgia" },
  { code: "NC", name: "North Carolina" },
  { code: "SC", name: "South Carolina" },
  { code: "MI", name: "Michigan" },
];

export function BuyingAreas() {
  const [ref, reveal] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F0F0F0",
        padding: "clamp(48px, 6vw, 88px) clamp(16px, 4vw, 48px)",
        ...reveal,
      }}
    >
      <SectionHeader title="Our Buying Areas" subtitle="We buy houses in these states" />

      <div className="offer-states-grid">
        {states.map((s) => (
          <div key={s.code} className="hiw-card" style={cardStyle}>
            <div style={{ ...iconCircleStyle, marginBottom: "12px" }}>
              <span style={{ color: "white", fontWeight: "800", fontSize: "clamp(16px, 1.5vw, 20px)", letterSpacing: "1px" }}>
                {s.code}
              </span>
            </div>
            <p
              style={{
                color: "#183961",
                fontWeight: "700",
                fontSize: "clamp(14px, 1.3vw, 18px)",
                margin: 0,
              }}
            >
              {s.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── How It Works ────────────────────────────── */

const steps = [
  {
    icon: <FileIcon />,
    title: "Property Review & Comparable Sales",
    desc: "We'll review comparable home sales within approximately a 1–2 mile radius, focusing on similar properties. We'll put together a comp report based on recent sales and the property's condition, then provide you with a ballpark offer range. This is completely no-obligation.",
  },
  {
    icon: <CheckIcon />,
    title: "See If the Numbers Make Sense",
    desc: "If our numbers are in the same ballpark as your asking price, we can move forward and discuss the next steps.",
  },
  {
    icon: <SearchIcon />,
    title: "Inspection Period",
    desc: "Once we agree on the price and move forward with an agreement, we'll have a 14-day inspection period to evaluate the property and its repair needs.",
  },
  {
    icon: <KeyIcon />,
    title: "Closing",
    desc: "If everything checks out and we proceed, we aim to close within 25–30 days. We work with a local title company to coordinate the closing, handle the necessary paperwork, and help ensure the transaction is handled properly so everyone's interests are protected.",
  },
];

export function OfferHowItWorks() {
  const [ref, reveal] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#ffffff",
        padding: "clamp(48px, 6vw, 88px) clamp(16px, 4vw, 48px)",
        ...reveal,
      }}
    >
      <SectionHeader title="How It Works" subtitle="Simple, transparent, no pressure">
        Here&apos;s exactly what happens after you submit your property details.
      </SectionHeader>

      <div className="offer-hiw-grid">
        {steps.map((s, i) => (
          <div key={s.title} className="hiw-card" style={{ ...cardStyle, backgroundColor: "#ffffff" }}>
            <div style={iconCircleStyle}>{s.icon}</div>
            <p
              style={{
                color: "#183961",
                fontWeight: "700",
                fontSize: "clamp(14px, 1.3vw, 18px)",
                margin: "0 0 8px",
              }}
            >
              Step {i + 1}
            </p>
            <p
              style={{
                color: "#5aa6d1",
                fontWeight: "700",
                fontSize: "clamp(15px, 1.3vw, 18px)",
                lineHeight: 1.35,
                margin: "0 0 clamp(12px, 1.5vw, 20px)",
              }}
            >
              {s.title}
            </p>
            <p
              style={{
                color: "#555",
                fontSize: "clamp(13px, 1vw, 14px)",
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

/* ── No pressure ─────────────────────────────── */

export function OfferCta() {
  const [ref, reveal] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F0F0F0",
        padding: "clamp(48px, 7vw, 96px) clamp(20px, 6.5vw, 80px)",
        ...reveal,
      }}
    >
      {/* Same card style as "Our Story" on the About page */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "clamp(32px, 5vw, 64px) clamp(24px, 5vw, 64px)",
          boxShadow: "0 4px 32px rgba(24, 57, 97, 0.08)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#183961",
            fontWeight: "800",
            fontSize: "clamp(24px, 3vw, 36px)",
            margin: "0 0 10px",
            lineHeight: 1.15,
          }}
        >
          No Pressure. No Obligation.
        </h2>
        <div style={{ width: "60px", height: "3px", backgroundColor: "#5aa6d1", margin: "16px auto 24px" }} />
        <p style={{ color: "#333", fontSize: "clamp(13px, 1.05vw, 15px)", lineHeight: 1.85, margin: "0 0 28px" }}>
          There&apos;s never any pressure to accept an offer. We want you to
          understand the process and feel comfortable deciding whether it
          works for you. Have questions? Call us at{" "}
          <a href="tel:5733129899" style={{ color: "#183961", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap" }}>
            (573) 312-9899
          </a>
          .
        </p>
        <div className="offer-cta-actions">
          <a href="#offer-form" className="offer-btn offer-btn-blue">Get My Offer</a>
          <a href="tel:5733129899" className="offer-btn offer-btn-navy">Call Us</a>
        </div>
      </div>
    </section>
  );
}
