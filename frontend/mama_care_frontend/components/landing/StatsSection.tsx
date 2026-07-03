/**
 * components/landing/StatsSection.tsx
 *
 * A dark-background section showing three high-impact statistics about
 * Nigeria's maternal health crisis and how MamaCare addresses them.
 *
 * Receives pre-fetched stats as props from the parent Server Component (page.tsx).
 * Responsive: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop).
 *
 * Server Component — no interactivity required.
 */

import { HeartCrack, Languages, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PlatformStats } from "@/lib/placeholder-data";

/* ── SUB-COMPONENTS ────────────────────────────────────────────────────────── */

/**
 * A single stat card on the dark background.
 * @param Icon  - Lucide icon component (replaces emoji strings)
 * @param value - The main large stat value (e.g. "~20%")
 * @param label - Plain-English explanation of the stat
 * @param id    - HTML id for the element
 */
function StatCard({
  Icon, value, label, id,
}: {
  Icon: LucideIcon;
  value: string;
  label: string;
  id: string;
}) {
  return (
    <div id={id} style={{
      backgroundColor: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "2rem",
      textAlign: "center",
    }}>
      {/* Lucide icon — sized and tinted red to match the dark section palette */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem", color: "#F87171" }}>
        <Icon size={32} aria-hidden="true" />
      </div>

      {/* Prominent stat value */}
      <div style={{
        fontSize: "clamp(2rem, 5vw, 3rem)",
        fontWeight: 900, color: "#F87171",
        letterSpacing: "-0.03em", lineHeight: 1,
        marginBottom: "0.75rem",
      }}>
        {value}
      </div>

      {/* Plain-language label */}
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9375rem", lineHeight: 1.5 }}>
        {label}
      </p>
    </div>
  );
}

/* ── MAIN EXPORT ───────────────────────────────────────────────────────────── */

/**
 * Stats section — dark background with 3 impact figures.
 * @param stats - Platform statistics fetched (or mocked) in page.tsx
 */
export default function StatsSection({ stats }: { stats: PlatformStats }) {
  /** Map the stats object into a renderable array — each entry references a Lucide icon */
  const statCards = [
    { id: "stat-maternal",  Icon: HeartCrack, value: stats.maternalDeathStat, label: stats.maternalDeathLabel },
    { id: "stat-languages", Icon: Languages,  value: stats.languagesCount,    label: stats.languagesLabel },
    { id: "stat-analysis",  Icon: Zap,        value: stats.analysisType,      label: stats.analysisLabel },
  ];

  return (
    <section className="section-padding" style={{
      background: "linear-gradient(135deg, #1A1A1A 0%, #2D1A1A 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle red dot grid overlay for visual texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(192,57,43,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px", pointerEvents: "none",
      }} />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            fontWeight: 800, color: "#ffffff",
            marginBottom: "0.75rem",
          }}>
            The problem is real.{" "}
            <span style={{ color: "#F87171" }}>So is our solution.</span>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.55)", fontSize: "1rem",
            maxWidth: "460px", margin: "0 auto",
          }}>
            MamaCare AI was built specifically to address the maternal health
            crisis in Nigeria.
          </p>
        </header>

        {/* Responsive grid: 1→2→3 columns */}
        <div className="grid-1-to-3">
          {statCards.map((card) => (
            <StatCard key={card.id} {...card} />
          ))}
        </div>

      </div>
    </section>
  );
}
