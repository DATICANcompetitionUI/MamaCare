"use client";
/**
 * components/auth/RoleToggle.tsx
 *
 * Segmented control that lets the user choose between "Patient" and
 * "Healthcare Provider" at the top of the registration form.
 *
 * Visually it looks like two pills inside a rounded container.
 * The active pill slides to a solid red background.
 *
 * This is a pure presentational component — the parent (RegisterForm)
 * holds the state and passes it down via props.
 *
 * "use client" is declared here because it imports Lucide icon components
 * and renders interactive buttons. RegisterForm (the parent) is already
 * a client component, so this is consistent.
 */

import { HeartPulse, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { UserRole } from "@/lib/placeholder-data";

/* ── TYPES ─────────────────────────────────────────────────────────────────── */

export interface RoleToggleProps {
  /** Currently selected role */
  value: UserRole;
  /** Called when the user clicks an option */
  onChange: (role: UserRole) => void;
  /** When true, the toggle is greyed out (e.g. form is submitting) */
  disabled?: boolean;
}

/* ── OPTION DATA ─────────────────────────────────────────────────────────────── */

/**
 * The two role options shown in the toggle.
 * `Icon` is a Lucide icon component reference (not an instance) —
 * it gets rendered as <Icon size={18} /> inside the button.
 */
const ROLE_OPTIONS: { role: UserRole; Icon: LucideIcon; label: string; shortLabel: string }[] = [
  { role: "patient",  Icon: HeartPulse,  label: "I'm a Patient",       shortLabel: "Patient"  },
  { role: "provider", Icon: Stethoscope, label: "Healthcare Provider", shortLabel: "Provider" },
];

/* ── COMPONENT ─────────────────────────────────────────────────────────────── */

/**
 * Patient / Provider segmented toggle for the registration form.
 */
export default function RoleToggle({ value, onChange, disabled = false }: RoleToggleProps) {
  return (
    <div>
      {/* Section label */}
      <p style={{
        fontSize: "0.875rem", fontWeight: 600,
        color: "#374151", marginBottom: "0.625rem",
      }}>
        I am registering as a:
      </p>

      {/* Toggle container — pill-shaped tray */}
      <div
        role="group"
        aria-label="Select your role"
        style={{
          display: "flex",
          backgroundColor: "#F9FAFB",
          border: "1.5px solid #F0D9D9",
          borderRadius: "9999px",
          padding: "4px",
          gap: "4px",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {ROLE_OPTIONS.map(({ role, Icon, label, shortLabel }) => {
          const isActive = value === role;

          return (
            <button
              key={role}
              type="button"
              onClick={() => !disabled && onChange(role)}
              aria-pressed={isActive}
              /* Announce the full label to screen readers */
              aria-label={label}
              style={{
                flex: 1,
                padding: "0.625rem 0.5rem",
                borderRadius: "9999px",
                border: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                fontWeight: 600,
                fontSize: "clamp(0.8125rem, 2vw, 0.9375rem)",
                /* Active state: gradient red background, white text */
                backgroundColor: isActive ? "#C0392B" : "transparent",
                color: isActive ? "#ffffff" : "#6B7280",
                boxShadow: isActive ? "0 2px 8px rgba(192,57,43,0.3)" : "none",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {/* Lucide icon — replaces emoji, colour inherits from button colour */}
              <Icon size={18} aria-hidden="true" />
              {/* Show short label on very small screens, full label on larger */}
              <span className="hide-mobile">{label}</span>
              <span className="hide-desktop">{shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
