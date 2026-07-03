/**
 * components/landing/Footer.tsx
 *
 * Minimal site footer with logo, team credit, and language badges.
 * Responsive: stacks to a single centred column on mobile.
 *
 * Server Component — no interactivity required.
 */

import { Globe } from "lucide-react";

/** Heart SVG logo mark — matches the Navbar icon */
function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/** The 4 supported language badge pills */
function LanguagePills() {
  /* Plain language codes — Globe icon replaces per-language flag emojis */
  const langs = [
    { code: "EN", name: "English" },
    { code: "YO", name: "Yoruba"  },
    { code: "IG", name: "Igbo"    },
    { code: "HA", name: "Hausa"   },
  ];

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
      {langs.map((lang) => (
        <span key={lang.code} title={lang.name} style={{
          display: "inline-flex", alignItems: "center", gap: "0.3rem",
          backgroundColor: "#FFF5F5", border: "1px solid #F0D9D9",
          borderRadius: "9999px", padding: "0.2rem 0.625rem",
          fontSize: "0.75rem", color: "#C0392B", fontWeight: 600,
        }}>
          <Globe size={10} aria-hidden="true" />
          {lang.code}
        </span>
      ))}
    </div>
  );
}

/** Site footer */
export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "#ffffff",
      borderTop: "1px solid #F0D9D9",
      padding: "2rem 0",
    }}>
      <div className="section-container" style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.25rem",
      }}>

        {/* Logo + brand name */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, #C0392B, #E74C3C)",
            borderRadius: "8px", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <HeartIcon />
          </div>
          <span style={{ fontWeight: 700, color: "#1A1A1A", fontSize: "1rem" }}>
            MamaCare AI
          </span>
        </div>

        {/* Team credit */}
        <p style={{ color: "#9CA3AF", fontSize: "0.875rem", textAlign: "center" }}>
          Built by <strong style={{ color: "#6B7280" }}>Indubitable Team</strong>
          {" "}· Hackathon 2026 · v1.0
        </p>

        {/* Language support pills */}
        <LanguagePills />

      </div>
    </footer>
  );
}
