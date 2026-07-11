"use client";
/**
 * components/auth/PasswordField.tsx
 *
 * A specialised password input with a show/hide toggle button.
 * Uses "use client" because it tracks local UI state (whether the
 * password is currently visible or hidden).
 *
 * Also renders a simple password-strength bar so users know if their
 * password is strong enough before submitting.
 */

import { useState } from "react";

/* ── TYPES ─────────────────────────────────────────────────────────────────── */

export interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** If true, show the strength indicator bar below the input */
  showStrength?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  /** Autocomplete hint — "new-password" for registration, "current-password" for login */
  autoComplete?: "new-password" | "current-password";
}

/* ── HELPERS ────────────────────────────────────────────────────────────────── */

/**
 * Calculates a password strength score from 0 (empty) to 4 (strong).
 * Rules:
 *  +1  length ≥ 8
 *  +1  contains a lowercase letter
 *  +1  contains an uppercase letter
 *  +1  contains a digit or special character
 */
function getPasswordStrength(password: string): { score: number; label: string; colour: string } {
  if (!password) return { score: 0, label: "", colour: "#E5E7EB" };

  let score = 0;
  if (password.length >= 8)           score++;
  if (/[a-z]/.test(password))         score++;
  if (/[A-Z]/.test(password))         score++;
  if (/[\d\W]/.test(password))        score++;

  const levels = [
    { label: "Too short",  colour: "#EF4444" },  // score 0 — won't appear (handled above)
    { label: "Weak",       colour: "#EF4444" },  // score 1
    { label: "Fair",       colour: "#F59E0B" },  // score 2
    { label: "Good",       colour: "#10B981" },  // score 3
    { label: "Strong",     colour: "#059669" },  // score 4
  ];

  return { score, ...levels[score] };
}

/* ── COMPONENT ─────────────────────────────────────────────────────────────── */

/**
 * Password input with an eye icon toggle to show/hide the value,
 * and an optional strength indicator bar below.
 */
export default function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  showStrength = false,
  disabled = false,
  required = false,
  placeholder = "••••••••",
  autoComplete = "current-password",
}: PasswordFieldProps) {
  /** Controls whether the raw password text is visible */
  const [isVisible, setIsVisible] = useState(false);
  const hasError = Boolean(error);
  const strength = showStrength ? getPasswordStrength(value) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>

      {/* Label */}
      <label htmlFor={id} style={{
        fontSize: "0.875rem", fontWeight: 600, color: "#374151",
        display: "flex", gap: "0.25rem", alignItems: "center",
      }}>
        {label}
        {required && <span style={{ color: "#C0392B" }} aria-hidden="true">*</span>}
      </label>

      {/* Input wrapper — positions the toggle button inside the input */}
      <div style={{ position: "relative" }}>
        <input
          id={id}
          name={id}
          /* Toggle between "password" (hidden) and "text" (visible) */
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          style={{
            width: "100%",
            height: "48px",
            /* Extra right padding so text doesn't run under the toggle button */
            padding: "0 3rem 0 1rem",
            borderRadius: "10px",
            fontSize: "0.9375rem",
            color: "#1A1A1A",
            outline: "none",
            border: hasError ? "1.5px solid #DC2626" : "1.5px solid #F0D9D9",
            backgroundColor: hasError ? "#FFF5F5" : "#ffffff",
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? "not-allowed" : "text",
            transition: "border-color 0.15s ease",
            boxSizing: "border-box",
          }}
        />

        {/* Eye / Eye-off toggle button */}
        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          disabled={disabled}
          aria-label={isVisible ? "Hide password" : "Show password"}
          style={{
            position: "absolute", right: "0.75rem", top: "50%",
            transform: "translateY(-50%)",
            background: "none", border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            color: "#9CA3AF", padding: "0.25rem",
            display: "flex", alignItems: "center",
            transition: "color 0.15s ease",
          }}
        >
          {isVisible ? (
            /* Eye-off icon — shown when password is currently visible */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            /* Eye icon — shown when password is hidden */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>

      {/* Error message */}
      {hasError && (
        <p role="alert" style={{
          fontSize: "0.8125rem", color: "#DC2626",
          display: "flex", alignItems: "center", gap: "0.35rem",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          {error}
        </p>
      )}

      {/* Password strength bar — only rendered on registration form */}
      {showStrength && value && strength && (
        <div>
          {/* Four segment bar */}
          <div style={{ display: "flex", gap: "3px", marginBottom: "0.25rem" }}>
            {[1, 2, 3, 4].map((segment) => (
              <div key={segment} style={{
                flex: 1, height: "3px", borderRadius: "9999px",
                /* Fill up to the current score, leave the rest grey */
                backgroundColor: segment <= strength.score ? strength.colour : "#E5E7EB",
                transition: "background-color 0.2s ease",
              }} />
            ))}
          </div>
          {/* Strength label */}
          <p style={{ fontSize: "0.75rem", color: strength.colour, fontWeight: 600 }}>
            {strength.label}
          </p>
        </div>
      )}

    </div>
  );
}
