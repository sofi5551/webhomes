import { useEffect, useRef, useState } from "react";

export default function OurStory() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#F0F0F0", padding: "clamp(48px, 7vw, 96px) clamp(20px, 6.5vw, 80px)" }}>
      <div
        ref={ref}
        className={visible ? "our-story-animate" : undefined}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "clamp(36px, 5vw, 64px) clamp(28px, 5vw, 64px)",
          boxShadow: "0 4px 32px rgba(24, 57, 97, 0.08)",
          opacity: visible ? undefined : 0,
          transform: visible ? undefined : "translateY(30px)",
        }}
      >
        <h2
          style={{
            color: "#183961",
            fontWeight: "800",
            fontSize: "clamp(24px, 3vw, 36px)",
            margin: "0 0 clamp(20px, 2.5vw, 32px)",
            lineHeight: 1.15,
          }}
        >
          Our Story
        </h2>

        <p style={{ color: "#333", fontSize: "clamp(13px, 1.05vw, 15px)", lineHeight: 1.85, margin: "0 0 20px" }}>
          Hi! We&apos;re the team behind Webhomes—a group of passionate real estate professionals with a shared mission: to make selling your home as simple and stress-free as possible. We&apos;ve spent years working with homeowners across the region, and through that journey we saw firsthand how the traditional listing process often left sellers frustrated, overwhelmed, and stuck.
        </p>

        <p style={{ color: "#333", fontSize: "clamp(13px, 1.05vw, 15px)", lineHeight: 1.85, margin: "0 0 20px" }}>
          That&apos;s why we built Webhomes—to offer a better way. Whether you&apos;re dealing with a difficult property, going through a major life change, facing foreclosure, or simply want to skip the hassle of repairs and showings, we&apos;re here to give you a fair cash offer and close on your timeline.
        </p>

        <p style={{ color: "#333", fontSize: "clamp(13px, 1.05vw, 15px)", lineHeight: 1.85, margin: 0 }}>
          We buy homes in as-is condition with no hidden fees and no surprises—just honest, straightforward transactions built on trust. At Webhomes, you&apos;re never just another deal. You&apos;re a homeowner we genuinely want to help, and we&apos;re here every step of the way.
        </p>
      </div>
    </section>
  );
}
