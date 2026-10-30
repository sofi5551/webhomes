import Image from "next/image";
import Link from "next/link";

const CircleArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <circle cx="10" cy="10" r="10" fill="#5aa6d1" />
    <path
      d="M8 6.5L11.5 10L8 13.5"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="#5aa6d1"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Get My Offer", href: "/get-my-offer" },
  { label: "Join Our Buyers List", href: "/buyers-list" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const infoLinks = [
  { label: "Connect Via Text", href: "/terms-conditions#top" },
  { label: "Messaging T&Cs", href: "/terms-conditions#messaging-terms" },
  { label: "Messaging Privacy Policy", href: "/terms-conditions#messaging-privacy" },
];

export default function Footer() {
  return (
    <footer>
      <div className="pb-10" style={{ backgroundColor: "#040f20" }}>
        <div
          className="footer-inner"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding:
              "clamp(40px, 5vw, 64px) clamp(20px, 6.5vw, 80px) clamp(32px, 4vw, 48px)",
          }}
        >
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
              gap: "clamp(24px, 3vw, 40px)",
            }}
          >
            {/* Column 1 — Brand */}
            <div>
              <div style={{ marginBottom: "clamp(16px, 2vw, 24px)" }}>
                <Image
                  src="/logo-nav.png"
                  alt="Webhomes"
                  width={213}
                  height={60}
                  style={{ width: "213px", height: "60px" }}
                />
              </div>
              <p
                style={{
                  color: "white",
                  fontSize: "clamp(12px, 1.1vw, 16px)",
                  lineHeight: "1.9",
                  margin: 0,
                }}
              >
                We&apos;re a real estate solutions company committed to making
                home selling simple, stress-free, and fast. Whether you&apos;re
                dealing with a burdensome property, facing a major life
                transition, or just looking for a hassle-free way to
                sell—we&apos;re here to help.
              </p>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <h3
                style={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  marginBottom: "clamp(16px, 2vw, 24px)",
                  marginTop: 0,
                }}
              >
                Quick Links
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(10px, 1.2vw, 14px)",
                }}
              >
                {quickLinks.map((link) => (
                  <li
                    key={link.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <CircleArrowIcon />
                    <Link
                      href={link.href}
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "clamp(12px, 1.1vw, 14px)",
                        fontWeight: "400",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Informations */}
            <div>
              <h3
                style={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  marginBottom: "clamp(16px, 2vw, 24px)",
                  marginTop: 0,
                }}
              >
                Informations
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(10px, 1.2vw, 14px)",
                }}
              >
                {infoLinks.map((link) => (
                  <li
                    key={link.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <CircleArrowIcon />
                    <Link
                      href={link.href}
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "clamp(12px, 1.1vw, 14px)",
                        fontWeight: "400",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Get In Touch */}
            <div>
              <h3
                style={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  marginBottom: "clamp(16px, 2vw, 24px)",
                  marginTop: 0,
                }}
              >
                Get In Touch
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(12px, 1.5vw, 16px)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <PhoneIcon />
                  <a
                    href="tel:5733129899"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                    }}
                  >
                    (573) 312-9899
                  </a>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <MailIcon />
                  <a
                    href="mailto:info@thewebhomes.com"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                      wordBreak: "break-all",
                    }}
                  >
                    info@thewebhomes.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="footer-bottom"
        style={{
          backgroundColor: "black",
          padding: "clamp(14px, 1.5vw, 18px) clamp(16px, 3vw, 32px)",
        }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}
        >
          <p
            style={{
              color: "#5aa6d1",
              fontSize: "clamp(11px, 1.2vw, 20px)",
              margin: 0,
            }}
          >
            &copy;2025 <strong style={{ color: "#ffffff" }}>WEBHOMES</strong> |
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
