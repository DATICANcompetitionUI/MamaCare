/**
 * components/auth/AuthCard.tsx
 *
 * Shared page layout wrapper for all auth pages (register, login, reset password).
 * Provides:
 *  - Full-page blush (#FFF5F5) background
 *  - Centred white card with red-tinted shadow
 *  - MamaCare logo at the top of the card
 *  - A title and optional subtitle below the logo
 *  - The `children` rendered inside the card (the actual form)
 *
 * Responsive:
 *  - Mobile  : card fills the screen with no margin, max padding
 *  - Tablet+ : card is centred with a max-width of 480px
 *
 * This is a Server Component (no interactivity needed).
 */

import Link from "next/link";
import { ReactNode } from "react";

/* ── TYPES ─────────────────────────────────────────────────────────────────── */

export interface AuthCardProps {
  /** Main heading shown at the top of the card, e.g. "Create your account" */
  title: string;
  /** Optional supporting text below the title */
  subtitle?: string;
  /** The form or content to render inside the card */
  children: ReactNode;
}

/* ── COMPONENT ─────────────────────────────────────────────────────────────── */

/** Shared card shell used by every auth page */
export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    /* Full-page background — blush tone matching the rest of the app */
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#FFF5F5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      /* Use 'start' not 'center' on very short screens so the card top is always visible */
      justifyContent: "flex-start",
      padding: "2rem 1.5rem",
      /* Small dot grid for subtle visual texture */
      backgroundImage: "radial-gradient(rgba(192,57,43,0.05) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    }}>

      {/* The card itself */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        /* Responsive width: takes full width on tiny screens, caps at 480px */
        width: "100%",
        maxWidth: "480px",
        /* Add top margin so on tall screens the card is visually centred */
        marginTop: "auto",
        marginBottom: "auto",
        padding: "clamp(1.5rem, 5vw, 2.5rem)",
        boxShadow: "0 4px 24px rgba(192,57,43,0.10), 0 1px 4px rgba(192,57,43,0.06)",
        border: "1px solid #F0D9D9",
      }}>

        {/* ── Card header: logo + title ── */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>

          {/* Logo mark + brand name */}
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center",
            gap: "0.625rem", textDecoration: "none",
            marginBottom: "1.5rem",
          }}>
            <div style={{
              width: "42px", height: "42px",
              background: "linear-gradient(135deg, #C0392B, #E74C3C)",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 10px rgba(192,57,43,0.3)",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: "1.25rem", color: "#C0392B", letterSpacing: "-0.02em" }}>
              MamaCare <span style={{ color: "#1A1A1A", fontWeight: 400 }}>AI</span>
            </span>
          </Link>

          {/* Page title */}
          <h1 style={{
            fontSize: "clamp(1.4rem, 4vw, 1.75rem)",
            fontWeight: 800,
            color: "#1A1A1A",
            marginBottom: subtitle ? "0.5rem" : 0,
            letterSpacing: "-0.02em",
          }}>
            {title}
          </h1>

          {/* Optional subtitle */}
          {subtitle && (
            <p style={{ color: "#6B7280", fontSize: "0.9375rem", lineHeight: 1.6 }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* ── Form content ── */}
        {children}

      </div>

      {/* Legal note at the very bottom of the page */}
      <p style={{
        marginTop: "1.5rem",
        color: "#9CA3AF",
        fontSize: "0.75rem",
        textAlign: "center",
        maxWidth: "380px",
      }}>
        By using MamaCare AI you agree to our{" "}
        <Link href="/terms" style={{ color: "#C0392B", textDecoration: "none" }}>Terms</Link>
        {" "}and{" "}
        <Link href="/privacy" style={{ color: "#C0392B", textDecoration: "none" }}>Privacy Policy</Link>.
        Your health data is encrypted and never shared.
      </p>
    </div>
  );
}
