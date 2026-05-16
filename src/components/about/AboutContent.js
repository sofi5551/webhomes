import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WrenchIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const DollarIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="17 14 15 16 14 15" />
  </svg>
);

const features = [
  { icon: <WrenchIcon />, title: "No Repairs", desc: "We buy homes as-is." },
  {
    icon: <EyeOffIcon />,
    title: "No Showings",
    desc: "Skip the hassle of showings.",
  },
  {
    icon: <DollarIcon />,
    title: "Cash Offers",
    desc: "Fair cash offers with no hidden fees.",
  },
  {
    icon: <CalendarIcon />,
    title: "Closure on Time",
    desc: "We close when it's convenient for you.",
  },
];

export default function AboutContent() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        minHeight: "clamp(520px, 58vw, 750px)",
      }}
    >
      {/* Background image — starts at gradient fade point */}
      <div
        className={visible ? "about-image-animate" : undefined}
        style={{
          position: "absolute",
          left: "39%",
          top: 0,
          right: 0,
          bottom: 0,
          transform: visible ? undefined : "translateX(-80px)",
          opacity: visible ? undefined : 0,
        }}
      >
        <Image
          src="/home-about-2.png"
          alt="Webhomes property"
          fill
          style={{ objectFit: "cover", objectPosition: "left center" }}
        />
      </div>

      {/* Gradient overlay — always pinned at image boundary for all screen sizes */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "calc(39% - 140px)",
          width: "260px",
          background: "linear-gradient(to right, #ffffff 35%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content — single wrapper with one gradient */}
      <div
        className={visible ? "about-content-animate" : undefined}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "720px",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(to right, #ffffff 79%, rgba(255,255,255,0.5) 88%, transparent 100%)",
          transform: visible ? undefined : "translateX(-100%)",
        }}
      >
        {/* Text section */}
        <div
          style={{
            padding:
              "clamp(48px, 6vw, 80px) clamp(24px, 6.5vw, 80px) clamp(28px, 3.5vw, 44px) clamp(24px, 6.5vw, 80px)",
            maxWidth: "550px",
          }}
        >
          <p
            style={{
              color: "#183961",
              fontWeight: "700",
              fontSize: "clamp(14px, 1.2vw, 18px)",
              margin: "0 0 4px",
            }}
          >
            Welcome to
          </p>

          <h2
            style={{
              color: "#183961",
              fontWeight: "800",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              margin: "0 0 2px",
              lineHeight: 1.05,
            }}
          >
            Webhomes
          </h2>

          <div
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: "#5aa6d1",
              margin: "16px 0 clamp(20px, 2.5vw, 30px)",
            }}
          />

          <p
            style={{
              color: "#333",
              fontSize: "clamp(12px, 1vw, 14px)",
              lineHeight: 1.85,
              margin: "0 0 14px",
              fontWeight: "400",
            }}
          >
            We&apos;re a real estate solutions company committed to making home
            selling simple, stress-free, and fast. Whether you&apos;re dealing
            with a burdensome property, facing a major life transition, or just
            looking for a hassle-free way to sell—we&apos;re here to help.
          </p>

          <p
            style={{
              color: "#333",
              fontSize: "clamp(12px, 1vw, 14px)",
              lineHeight: 1.85,
              margin: "0 0 14px",
              fontWeight: "400",
            }}
          >
            We buy homes in as-is condition—no repairs, no clean-up, no showings.
            Just a fair cash offer and a smooth closing on your timeline.
          </p>

          <p
            style={{
              color: "#183961",
              fontWeight: "700",
              fontSize: "clamp(13px, 1.05vw, 15px)",
              margin: "0 0 4px",
            }}
          >
            You don&apos;t have to lift a finger.
          </p>
          <p
            style={{
              color: "#333",
              fontSize: "clamp(12px, 1vw, 14px)",
              lineHeight: 1.75,
              margin: "0",
            }}
          >
            We&apos;ll handle the heavy lifting—so you can focus on what&apos;s next.
          </p>
        </div>

        {/* Icons section */}
        <div
          style={{
            padding: "0 clamp(24px, 6.5vw, 80px) clamp(48px, 6vw, 80px) clamp(16px, 5vw, 68px)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 clamp(6px, 1vw, 12px)",
                borderLeft: i > 0 ? "1px solid #d0d0d0" : "none",
              }}
            >
              <div
                style={{
                  width: "clamp(48px, 4.2vw, 60px)",
                  height: "clamp(48px, 4.2vw, 60px)",
                  backgroundColor: "#183961",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <p
                style={{
                  color: "#183961",
                  fontWeight: "700",
                  fontSize: "clamp(10px, 0.82vw, 13px)",
                  margin: "0 0 4px",
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </p>
              <p
                style={{
                  color: "#555",
                  fontSize: "clamp(10px, 0.75vw, 11px)",
                  margin: 0,
                  lineHeight: 1.45,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
