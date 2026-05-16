import { useState, useEffect, useRef } from "react";

const GAP = 24;

const testimonials = [
  {
    name: "Jason L.",
    review:
      "I needed to sell fast due to a job relocation, and they delivered. No repairs, no listings, no stress. Just a smooth, professional experience from start to finish.",
  },
  {
    name: "Linda R.",
    review:
      "I was dealing with a difficult property and didn't know where to start. They walked me through every step and handled everything. I couldn't believe how simple they made it.",
  },
  {
    name: "Sarah M.",
    review:
      "Selling my house felt overwhelming until I found this team. They made everything so easy—from the first call to closing. I had an offer in 24 hours and closed in a week!",
  },
  {
    name: "Michael T.",
    review:
      "The process was incredibly straightforward. They gave me a fair cash offer within 24 hours and we closed on my timeline. Highly recommend to anyone looking to sell quickly!",
  },
  {
    name: "Patricia W.",
    review:
      "I was skeptical at first, but they proved me wrong. No hidden fees, no last-minute surprises. The offer was fair and the whole thing was done in less than two weeks.",
  },
  {
    name: "David K.",
    review:
      "After trying to sell traditionally for months, I contacted Webhomes. Best decision ever. Got a fair offer, closed fast, and moved on with my life. Truly stress-free.",
  },
];

const UserIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#183961"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function Testimonials({ bgColor = "#CBCBCB", cardBg = "#d8d8d8" }) {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setSectionVisible(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef(null);
  const directionRef = useRef(1);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const timerRef = useRef(null);

  const maxIndex = testimonials.length - visibleCount;

  // Measure card width
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vc = vw <= 640 ? 1 : vw <= 1024 ? 2 : 3;
      setVisibleCount(vc);
      if (containerRef.current) {
        const cw =
          (containerRef.current.offsetWidth - GAP * (vc - 1)) / vc;
        setCardWidth(cw);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset index if visibleCount changes
  useEffect(() => {
    setCurrentIndex(0);
    directionRef.current = 1;
  }, [visibleCount]);

  // Ping-pong auto-advance
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const max = testimonials.length - visibleCount;
        let next = prev + directionRef.current;
        if (next >= max) {
          next = max;
          directionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          directionRef.current = 1;
        }
        return next;
      });
    }, 10000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [visibleCount]);

  // Navigate manually (resets timer)
  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
    startTimer();
  };

  // Drag — mouse
  const onMouseDown = (e) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    setDragOffset(e.clientX - dragStartX.current);
  };
  const onMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    setDragOffset(0);
    const diff = dragStartX.current - e.clientX;
    if (diff > 60) goTo(currentIndex + 1);
    else if (diff < -60) goTo(currentIndex - 1);
  };
  const onMouseLeave = (e) => {
    if (isDragging.current) onMouseUp(e);
  };

  // Drag — touch
  const onTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragging(true);
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    setDragOffset(e.touches[0].clientX - dragStartX.current);
  };
  const onTouchEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    setDragOffset(0);
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) goTo(currentIndex + 1);
    else if (diff < -60) goTo(currentIndex - 1);
  };

  const translateX = -(currentIndex * (cardWidth + GAP)) + dragOffset;

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: bgColor,
        padding: "clamp(48px, 6vw, 88px) clamp(16px, 4vw, 48px)",
        overflow: "hidden",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          color: "#183961",
          fontWeight: "700",
          fontSize: "clamp(28px, 4vw, 48px)",
          textAlign: "center",
          margin: "0 0 clamp(32px, 4vw, 56px)",
          letterSpacing: "1px",
        }}
      >
        Testimonials
      </h2>

      {/* Carousel track wrapper */}
      <div
        ref={containerRef}
        style={{
          maxWidth: "1260px",
          margin: "0 auto",
          overflow: "hidden",
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track */}
        <div
          style={{
            display: "flex",
            gap: `${GAP}px`,
            transform: cardWidth > 0 ? `translateX(${translateX}px)` : "none",
            transition: dragging ? "none" : "transform 0.55s ease",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: cardWidth > 0 ? `${cardWidth}px` : `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`,
                backgroundColor: cardBg,
                borderRadius: "16px",
                padding: "clamp(20px, 2.5vw, 32px)",
                position: "relative",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              {/* Quote badge */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "80px",
                  height: "76px",
                  backgroundColor: "#183961",
                  borderRadius: "0 16px 0 40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontFamily: "Georgia, serif",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: "72px", lineHeight: 1, display: "block", transform: "translateY(12px)" }}>&rdquo;</span>
              </div>

              {/* Avatar */}
              <div style={{ marginBottom: "12px", marginTop: "8px" }}>
                <UserIcon />
              </div>

              {/* Name */}
              <p
                style={{
                  color: "#5aa6d1",
                  fontWeight: "600",
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  margin: "0 0 10px",
                }}
              >
                &mdash; {t.name}
              </p>

              {/* Stars */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: "#f59e0b", fontSize: "clamp(16px, 1.4vw, 20px)" }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Review text */}
              <p
                style={{
                  color: "#333",
                  fontSize: "clamp(13px, 1vw, 15px)",
                  lineHeight: 1.8,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.review}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
