/**
 * components/auth/FormField.tsx
 *
 * A reusable, accessible form field wrapper used across all auth forms.
 * Renders a label, an <input>, an optional helper text line, and an inline
 * error message when validation fails.
 *
 * This is a Server Component — it has no interactivity itself. The parent
 * Client Component passes onChange/value/error as props.
 */

/* ── TYPES ─────────────────────────────────────────────────────────────────── */

export interface FormFieldProps {
  /** The HTML `id` — also used as `htmlFor` on the <label> for accessibility */
  id: string;
  /** Label text shown above the input */
  label: string;
  /** Input type: "text" | "email" | "tel" | "number" etc. (NOT "password" — use PasswordField) */
  type?: string;
  /** Current value (controlled component) */
  value: string;
  /** Called every time the input changes */
  onChange: (value: string) => void;
  /** Placeholder text shown inside the empty input */
  placeholder?: string;
  /** If set, shows a red error message below the input and applies error styling */
  error?: string;
  /** Small hint text shown below the input (only shown when there is no error) */
  hint?: string;
  /** Whether the input is disabled (e.g. while form is submitting) */
  disabled?: boolean;
  /** Whether this field is required — adds the HTML required attribute */
  required?: boolean;
}

/* ── COMPONENT ─────────────────────────────────────────────────────────────── */

/**
 * Labelled text input with inline error support.
 * Use this for any field that is NOT a password (use PasswordField for those).
 */
export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  hint,
  disabled = false,
  required = false,
}: FormFieldProps) {
  /** Whether the field is in an error state — controls border and background colour */
  const hasError = Boolean(error);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>

      {/* Label */}
      <label htmlFor={id} style={{
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "#374151",
        /* Show a small red asterisk for required fields */
        display: "flex", gap: "0.25rem", alignItems: "center",
      }}>
        {label}
        {required && <span style={{ color: "#C0392B" }} aria-hidden="true">*</span>}
      </label>

      {/* Input */}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={type === "email" ? "email" : undefined}
        style={{
          width: "100%",
          height: "48px",
          padding: "0 1rem",
          borderRadius: "10px",
          fontSize: "0.9375rem",
          color: "#1A1A1A",
          outline: "none",
          /* Red border on error, normal border otherwise */
          border: hasError ? "1.5px solid #DC2626" : "1.5px solid #F0D9D9",
          /* Slightly tinted background on error */
          backgroundColor: hasError ? "#FFF5F5" : "#ffffff",
          /* Dim the field while the form is submitting */
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "text",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          boxSizing: "border-box",
        }}
      />

      {/* Error message — shown instead of hint when validation fails */}
      {hasError && (
        <p role="alert" style={{
          fontSize: "0.8125rem", color: "#DC2626",
          display: "flex", alignItems: "center", gap: "0.35rem",
        }}>
          {/* Small warning triangle icon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {error}
        </p>
      )}

      {/* Hint text — only shown when there is no error */}
      {!hasError && hint && (
        <p style={{ fontSize: "0.8125rem", color: "#9CA3AF" }}>{hint}</p>
      )}

    </div>
  );
}
