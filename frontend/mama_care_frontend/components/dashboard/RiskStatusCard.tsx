/**
 * components/dashboard/RiskStatusCard.tsx
 *
 * Hero card on the Patient Dashboard displaying the latest AI risk prediction.
 *
 * Two visual states:
 *  1. **Has prediction** — Colour-coded card (Low/Moderate/High/Critical) with
 *     the risk level, last-checked date, summary text, and a CTA to start a
 *     new assessment.
 *  2. **Empty state** — Soft blush card with an encouraging message and a
 *     prominent CTA to begin the first health check.
 *
 * This component is a pure Server Component — no hooks or browser APIs.
 */

import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { PredictionEntry, RISK_COLOURS } from "@/lib/dashboard-data";

/* ── PROPS ──────────────────────────────────────────────────────────────────── */

interface RiskStatusCardProps {
  /** Latest prediction, or null if the patient hasn't completed an assessment */
  prediction: PredictionEntry | null;
}

/* ── HELPERS ───────────────────────────────────────────────────────────────── */

/**
 * Formats an ISO date string into a human-friendly format.
 * @example formatDate("2026-07-02T14:30:00Z") → "2 July 2026"
 */
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── EMPTY STATE ───────────────────────────────────────────────────────────── */

/**
 * Shown when the patient has no predictions yet.
 * Provides an encouraging prompt to take their first assessment.
 */
function EmptyState() {
  return (
    <section
      style={{
        backgroundColor: "#FFF5F5",
        border: "1px solid #F0D9D9",
        borderRadius: "1rem",
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#FDECEA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeartPulse size={28} color="#C0392B" strokeWidth={2} />
      </div>

      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#1A1A1A",
          margin: 0,
        }}
      >
        You haven&apos;t done a health check yet
      </h2>

      <p
        style={{
          fontSize: "0.9375rem",
          color: "#6B7280",
          margin: 0,
          maxWidth: "360px",
        }}
      >
        Your first assessment takes less than 2 minutes.
      </p>

      {/* CTA button */}
      <Link
        href="/dashboard/assessment"
        style={{
          display: "inline-block",
          marginTop: "0.5rem",
          backgroundColor: "#C0392B",
          color: "#FFFFFF",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.75rem",
          fontSize: "0.9375rem",
          fontWeight: 700,
          textDecoration: "none",
          transition: "background-color 0.2s ease",
        }}
      >
        Start Your First Assessment →
      </Link>
    </section>
  );
}

/* ── POPULATED STATE ───────────────────────────────────────────────────────── */

/**
 * Shows the latest prediction in a colour-coded card.
 * @param prediction – The most recent PredictionEntry
 */
function PopulatedState({ prediction }: { prediction: PredictionEntry }) {
  const colours = RISK_COLOURS[prediction.riskLevel];

  return (
    <section
      style={{
        backgroundColor: colours.bg,
        border: `1px solid ${colours.border}`,
        borderRadius: "1rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {/* Risk level badge */}
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: colours.text,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {prediction.riskLevel} Risk
      </span>

      {/* Last checked date */}
      <p
        style={{
          fontSize: "0.875rem",
          color: colours.text,
          margin: 0,
          opacity: 0.75,
        }}
      >
        Last checked: {formatDate(prediction.date)}
      </p>

      {/* Summary */}
      <p
        style={{
          fontSize: "1rem",
          color: colours.text,
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {prediction.summary}
      </p>

      {/* CTA button */}
      <Link
        href="/dashboard/assessment"
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          marginTop: "0.5rem",
          backgroundColor: "#FFFFFF",
          color: colours.text,
          padding: "0.75rem 1.5rem",
          borderRadius: "0.75rem",
          fontSize: "0.9375rem",
          fontWeight: 700,
          textDecoration: "none",
          border: `1px solid ${colours.border}`,
          transition: "opacity 0.2s ease",
        }}
      >
        Start New Assessment →
      </Link>
    </section>
  );
}

/* ── MAIN EXPORT ───────────────────────────────────────────────────────────── */

/**
 * Hero risk-status card for the patient dashboard.
 *
 * @example
 * ```tsx
 * <RiskStatusCard prediction={latestPrediction} />
 * <RiskStatusCard prediction={null} /> // empty state
 * ```
 */
export default function RiskStatusCard({ prediction }: RiskStatusCardProps) {
  if (!prediction) {
    return <EmptyState />;
  }
  return <PopulatedState prediction={prediction} />;
}
