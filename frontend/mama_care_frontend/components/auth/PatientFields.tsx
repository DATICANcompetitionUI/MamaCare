/**
 * components/auth/PatientFields.tsx
 *
 * The patient-specific form fields shown inside the registration form.
 * Rendered when role === "patient".
 *
 * Fields: Full Name, Email, Password, Confirm Password, Preferred Language.
 *
 * Pure presentational — no state here. All values and onChange handlers
 * come from the parent RegisterForm.
 */

import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import { SUPPORTED_LANGUAGES, LanguageCode } from "@/lib/placeholder-data";

/* ── TYPES ─────────────────────────────────────────────────────────────────── */

export interface PatientFieldValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  preferredLanguage: LanguageCode | "";
}

export interface PatientFieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  preferredLanguage?: string;
}

export interface PatientFieldProps {
  values: PatientFieldValues;
  errors: PatientFieldErrors;
  disabled: boolean;
  onChange: (field: keyof PatientFieldValues, value: string) => void;
}

/* ── COMPONENT ─────────────────────────────────────────────────────────────── */

/**
 * Renders the 5 form fields for the Patient registration flow.
 * All state is lifted up to RegisterForm.
 */
export default function PatientFields({ values, errors, disabled, onChange }: PatientFieldProps) {
  return (
    <>
      {/* Full Name */}
      <FormField
        id="patient-fullName"
        label="Full Name"
        type="text"
        value={values.fullName}
        onChange={(v) => onChange("fullName", v)}
        placeholder="e.g. Amina Bello"
        error={errors.fullName}
        disabled={disabled}
        required
      />

      {/* Email */}
      <FormField
        id="patient-email"
        label="Email Address"
        type="email"
        value={values.email}
        onChange={(v) => onChange("email", v)}
        placeholder="you@example.com"
        error={errors.email}
        disabled={disabled}
        required
      />

      {/* Password with strength indicator */}
      <PasswordField
        id="patient-password"
        label="Password"
        value={values.password}
        onChange={(v) => onChange("password", v)}
        error={errors.password}
        showStrength
        autoComplete="new-password"
        disabled={disabled}
        required
      />

      {/* Confirm Password */}
      <PasswordField
        id="patient-confirmPassword"
        label="Confirm Password"
        value={values.confirmPassword}
        onChange={(v) => onChange("confirmPassword", v)}
        error={errors.confirmPassword}
        autoComplete="new-password"
        disabled={disabled}
        required
        placeholder="Re-enter your password"
      />

      {/* Preferred Language — styled <select> dropdown */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <label htmlFor="patient-language" style={{
          fontSize: "0.875rem", fontWeight: 600, color: "#374151",
          display: "flex", gap: "0.25rem", alignItems: "center",
        }}>
          Preferred Language
          <span style={{ color: "#C0392B" }} aria-hidden="true">*</span>
        </label>

        <select
          id="patient-language"
          name="preferredLanguage"
          value={values.preferredLanguage}
          onChange={(e) => onChange("preferredLanguage", e.target.value)}
          disabled={disabled}
          required
          style={{
            width: "100%", height: "48px",
            padding: "0 1rem",
            borderRadius: "10px", fontSize: "0.9375rem",
            color: values.preferredLanguage ? "#1A1A1A" : "#9CA3AF",
            outline: "none",
            border: errors.preferredLanguage ? "1.5px solid #DC2626" : "1.5px solid #F0D9D9",
            backgroundColor: errors.preferredLanguage ? "#FFF5F5" : "#ffffff",
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
            appearance: "none",
            /* Custom dropdown arrow */
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem",
          }}
        >
          <option value="" disabled>Select your language</option>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>

        {errors.preferredLanguage && (
          <p role="alert" style={{ fontSize: "0.8125rem", color: "#DC2626" }}>
            {errors.preferredLanguage}
          </p>
        )}

        <p style={{ fontSize: "0.8125rem", color: "#9CA3AF" }}>
          AI responses and voice interactions will use this language.
        </p>
      </div>
    </>
  );
}
