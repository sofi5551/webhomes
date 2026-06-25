import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const HeadsetIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 18v-6a9 9 0 0 1 18 0v6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 12h18M3 6h18M3 18h18"
      stroke="#183961"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="#183961"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Join Our Buyers List", href: "/buyers-list" },
  { label: "Contact", href: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <>
      <nav
        style={{
          backgroundColor: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "clamp(10px, 1.5vw, 14px) clamp(16px, 3vw, 32px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="px-12"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo-nav.png"
              alt="Webhomes"
              width={197}
              height={55}
              priority
              className="my-2"
              style={{ width: "196.17px", height: "55.17px" }}
            />
          </Link>

          {/* Desktop nav links */}
          <div
            className="nav-links-desktop"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
            }}
          >
            {/* Main links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(20px, 3vw, 32px)",
              }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      color: isActive ? "#9ca3af" : "#183961",
                      textDecoration: "none",
                      fontWeight: isActive ? "400" : "500",
                      fontSize: "clamp(13px, 1.2vw, 20px)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Policy links — second row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(16px, 2vw, 28px)",
              }}
            >
              {policyLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      color: isActive ? "#9ca3af" : "#183961",
                      textDecoration: "none",
                      fontWeight: isActive ? "400" : "500",
                      fontSize: "clamp(11px, 0.9vw, 13px)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop phone */}
          <div
            className="nav-phone-desktop me-28"
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div
              style={{
                backgroundColor: "#5aa6d1",
                borderRadius: "50%",
                width: "clamp(42px, 4vw, 35px)",
                height: "clamp(42px, 4vw, 35px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <HeadsetIcon />
            </div>
            <div>
              <div
                style={{
                  color: "#183961",
                  fontWeight: "700",
                  fontSize: "clamp(14px, 1.4vw, 18px)",
                  lineHeight: 1.25,
                }}
              >
                (301) 401-1947
              </div>
              <div
                style={{
                  color: "#5aa6d1",
                  // fontSize: "clamp(11px, 0.9vw, 13px)",
                  fontWeight: "500",
                  fontSize: "clamp(14px, 1.4vw, 18px)",
                }}
              >
                Call Us At
              </div>
            </div>
          </div>

          {/* Hamburger — hidden on desktop via CSS */}
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 1001,
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "clamp(260px, 80vw, 300px)",
          backgroundColor: "#ffffff",
          zIndex: 1002,
          transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          padding: "clamp(20px, 4vw, 28px) clamp(16px, 4vw, 24px)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "36px",
          }}
        >
          <Image
            src="/logo-nav.png"
            alt="Webhomes"
            width={130}
            height={44}
            style={{ width: "clamp(100px, 28vw, 130px)", height: "auto" }}
          />
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  color: isActive ? "#9ca3af" : "#183961",
                  textDecoration: "none",
                  fontWeight: isActive ? "400" : "500",
                  fontSize: "clamp(14px, 4vw, 16px)",
                  borderBottom: "1px solid #f0f0f0",
                  padding: "16px 0",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div style={{ borderTop: "2px solid #e8edf3", margin: "8px 0" }} />

          {policyLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  color: isActive ? "#9ca3af" : "#555",
                  textDecoration: "none",
                  fontWeight: isActive ? "400" : "500",
                  fontSize: "clamp(13px, 3.5vw, 14px)",
                  borderBottom: "1px solid #f0f0f0",
                  padding: "13px 0",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "36px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: "#5aa6d1",
              borderRadius: "50%",
              width: "46px",
              height: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <HeadsetIcon />
          </div>
          <div>
            <div
              style={{
                color: "#183961",
                fontWeight: "700",
                fontSize: "clamp(14px, 4vw, 16px)",
                lineHeight: 1.25,
              }}
            >
              (301) 401-1947
            </div>
            <div
              style={{
                color: "#5aa6d1",
                fontSize: "clamp(11px, 3vw, 13px)",
                fontWeight: "500",
              }}
            >
              Call Us At
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
