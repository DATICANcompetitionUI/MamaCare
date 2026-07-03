/**
 * components/landing/HowItWorksSection.tsx
 *
 * A numbered 4-step flow showing how MamaCare AI works from signup to staying connected.
 * Responsive: 1 column (mobile) → 2 columns (small tablet) → 4 columns (desktop).
 *
 * Server Component — no interactivity required.
 */

/* ── STEP DATA ─────────────────────────────────────────────────────────────── */

/** Shape of a single how-it-works step */
interface Step {
  number: string;   /** displayed as "01", "02", etc. */
  title: string;
  description: string;
}

/** The four steps a patient goes through when using MamaCare AI */
const STEPS: Step[] = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Register in minutes. Tell us about your pregnancy — gestational age, medical history, and preferred language.",
  },
  {
    number: "02",
    title: "Track Your Health",
    description:
      "Log your vitals after each check-up. Our AI watches for danger signs like high blood pressure or low haemoglobin.",
  },
  {
    number: "03",
    title: "Understand Your Results",
    description:
      "Receive plain-language explanations of every reading. Know exactly what your lab report means and what to do next.",
  },
  {
    number: "04",
    title: "Stay Connected",
    description:
      "Link to your midwife with a simple 6-character Provider Code. Your healthcare provider can monitor your health remotely.",
  },
];

/* ── SUB-COMPONENTS ────────────────────────────────────────────────────────── */

/**
 * A single numbered step card.
 * @param step - The step data to render.
 */
function StepCard({ step }: { step: Step }) {
  return (
    <article
      id={`step-${step.number}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "1.5rem 1rem",
      }}
    >
      {/* Numbered circle */}
      <div style={{
        width: "56px", height: "56px", borderRadius: "50%",
        background: "linear-gradient(135deg, #C0392B, #E74C3C)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1.25rem", flexShrink: 0,
        boxShadow: "0 4px 16px rgba(192,57,43,0.3)",
      }}>
        <span style={{
          color: "white", fontWeight: 800,
          fontSize: "0.875rem", letterSpacing: "0.02em",
        }}>
          {step.number}
        </span>
      </div>

      {/* Step title */}
      <h3 style={{
        fontSize: "1.125rem", fontWeight: 700,
        color: "#1A1A1A", marginBottom: "0.625rem",
      }}>
        {step.title}
      </h3>

      {/* Step description */}
      <p style={{ color: "#6B7280", fontSize: "0.9375rem", lineHeight: 1.65 }}>
        {step.description}
      </p>
    </article>
  );
}

/* ── MAIN EXPORT ───────────────────────────────────────────────────────────── */

/** How It Works section — 4 numbered steps in a responsive grid */
export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding" style={{ backgroundColor: "#ffffff" }}>
      <div className="section-container">

        {/* Section header */}
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-label">How It Works</span>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 800, marginBottom: "1rem",
          }}>
            Get started in minutes,{" "}
            <span className="gradient-text">not hours</span>
          </h2>
          <p style={{
            color: "#6B7280", fontSize: "1.0625rem",
            maxWidth: "480px", margin: "0 auto", lineHeight: 1.7,
          }}>
            Designed to be simple for patients with any level of tech literacy.
          </p>
        </header>

        {/* Responsive grid: 1→2→4 columns */}
        <div className="grid-1-to-4">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

      </div>
    </section>
  );
}
