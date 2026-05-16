import Image from "next/image";

export default function ContactHero() {
  return (
    <section
      style={{
        position: "relative",
        height: "clamp(220px, 38vw, 420px)",
        overflow: "hidden",
      }}
    >
      <Image
        src="/home-6.png"
        alt="Contact Us"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(15, 30, 55, 0.38)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(20px, 6.5vw, 80px)",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "clamp(22px, 3.5vw, 48px)",
            letterSpacing: "2px",
            margin: 0,
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          Contact Us
        </h1>
      </div>
    </section>
  );
}
