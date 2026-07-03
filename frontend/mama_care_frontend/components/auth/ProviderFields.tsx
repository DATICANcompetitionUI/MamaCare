/**
 * components/auth/ProviderFields.tsx
 *
 * The healthcare-provider-specific fields shown in the registration form.
 * Rendered when role === "provider".
 *
 * Fields: Full Name, Email, Password, Confirm Password,
 *         Medical Licence Number, Affiliated Facility Name.
 *
 * Pure presentational — no state here. All values and handlers
 * come from RegisterForm.
 */

import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";

/* ── TYPES ─────────────────────────────────────────────────────────────────── */

export interface ProviderFieldValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  licenceNumber: string;
  facilityName: string;
}

export interface ProviderFieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  licenceNumber?: string;
  facilityName?: string;
}

export interface ProviderFieldProps {
  values: ProviderFieldValues;
  errors: ProviderFieldErrors;
  disabled: boolean;
  onChange: (field: keyof ProviderFieldValues, value: string) => void;
}

/* ── COMPONENT ─────────────────────────────────────────────────────────────── */

/**
 * Renders the 6 form fields for the Healthcare Provider registration flow.
 * All state is lifted up to RegisterForm.
 */
export default function ProviderFields({ values, errors, disabled, onChange }: ProviderFieldProps) {
  return (
    <>
      {/* Full Name */}
      <FormField
        id="provider-fullName"
        label="Full Name"
        type="text"
        value={values.fullName}
        onChange={(v) => onChange("fullName", v)}
        placeholder="e.g. Dr. Fatima Abubakar"
        error={errors.fullName}
        disabled={disabled}
        required
      />

      {/* Email */}
      <FormField
        id="provider-email"
        label="Work Email Address"
        type="email"
        value={values.email}
        onChange={(v) => onChange("email", v)}
        placeholder="doctor@hospital.org"
        error={errors.email}
        disabled={disabled}
        required
      />

      {/* Password with strength bar */}
      <PasswordField
        id="provider-password"
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
        id="provider-confirmPassword"
        label="Confirm Password"
        value={values.confirmPassword}
        onChange={(v) => onChange("confirmPassword", v)}
        error={errors.confirmPassword}
        autoComplete="new-password"
        disabled={disabled}
        required
        placeholder="Re-enter your password"
      />

      {/* Provider-only fields — visually separated */}
      <div style={{
        borderTop: "1px solid #F0D9D9",
        paddingTop: "1.25rem",
        display: "flex", flexDirection: "column", gap: "1.25rem",
      }}>
        {/* Visual label for the provider-specific section */}
        <p style={{
          fontSize: "0.8125rem", fontWeight: 600,
          color: "#C0392B", letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>
          Professional Details
        </p>

        {/* Medical Licence Number */}
        <FormField
          id="provider-licence"
          label="Medical Licence Number"
          type="text"
          value={values.licenceNumber}
          onChange={(v) => onChange("licenceNumber", v)}
          placeholder="e.g. NMC-123456"
          error={errors.licenceNumber}
          hint="Issued by the Nigerian Medical Council (NMC) or relevant body."
          disabled={disabled}
          required
        />

        {/* Affiliated Facility / Hospital Name */}
        <FormField
          id="provider-facility"
          label="Affiliated Facility / Hospital"
          type="text"
          value={values.facilityName}
          onChange={(v) => onChange("facilityName", v)}
          placeholder="e.g. Lagos University Teaching Hospital"
          error={errors.facilityName}
          disabled={disabled}
          required
        />
      </div>
    </>
  );
}
