import { OnboardingData } from "@/lib/placeholder-data";

interface Step3Props {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const COMMON_CONDITIONS = [
  "High Blood Pressure",
  "Diabetes",
  "Sickle Cell",
  "Asthma",
  "Heart Disease",
];

export default function Step3Medical({ data, updateData, onSubmit, onBack, isSubmitting }: Step3Props) {
  
  const toggleCondition = (condition: string) => {
    if (condition === "None") {
      updateData({ conditions: [] });
      return;
    }
    
    const current = data.conditions;
    if (current.includes(condition)) {
      updateData({ conditions: current.filter(c => c !== condition) });
    } else {
      updateData({ conditions: [...current.filter(c => c !== "None"), condition] });
    }
  };

  const isNoneSelected = data.conditions.length === 0;

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "0.5rem" }}>
        Your Health History
      </h2>
      <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
        Almost done! This helps us flag any risks early.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2.5rem" }}>
        
        {/* Pre-existing Conditions */}
        <div>
          <label style={{ display: "block", fontSize: "1rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.75rem" }}>
            Do you have any of these conditions? (Tap all that apply)
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            
            <button
              onClick={() => toggleCondition("None")}
              style={{
                padding: "0.75rem 1.25rem", borderRadius: "9999px",
                border: `2px solid ${isNoneSelected ? "#16A34A" : "#F0D9D9"}`,
                backgroundColor: isNoneSelected ? "#F0FDF4" : "#ffffff",
                color: isNoneSelected ? "#166534" : "#6B7280",
                fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease"
              }}
            >
              None of these
            </button>

            {COMMON_CONDITIONS.map((cond) => {
              const isSelected = data.conditions.includes(cond);
              return (
                <button
                  key={cond}
                  onClick={() => toggleCondition(cond)}
                  style={{
                    padding: "0.75rem 1.25rem", borderRadius: "9999px",
                    border: `2px solid ${isSelected ? "#C0392B" : "#F0D9D9"}`,
                    backgroundColor: isSelected ? "#FFF5F5" : "#ffffff",
                    color: isSelected ? "#C0392B" : "#1A1A1A",
                    fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease"
                  }}
                >
                  {cond}
                </button>
              );
            })}
          </div>
        </div>

        {/* Allergies & Medications */}
        <div>
          <label style={{ display: "block", fontSize: "1rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
            Allergies or Current Medications? (Optional)
          </label>
          <input 
            type="text" 
            placeholder="e.g. Penicillin, Folic acid"
            value={data.allergies}
            onChange={(e) => updateData({ allergies: e.target.value })}
            style={{
              width: "100%", padding: "1rem", borderRadius: "0.75rem",
              border: "1px solid #F0D9D9", backgroundColor: "#ffffff",
              fontSize: "1rem", outline: "none",
            }}
          />
        </div>

        {/* Provider Code */}
        <div>
          <label style={{ display: "block", fontSize: "1rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
            Provider Code (Optional)
          </label>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "0.75rem" }}>
            If your midwife or doctor gave you a code, enter it here to link your account to them.
          </p>
          <input 
            type="text" 
            placeholder="e.g. MC-4X9T"
            value={data.providerCode}
            onChange={(e) => updateData({ providerCode: e.target.value })}
            style={{
              width: "100%", padding: "1rem", borderRadius: "0.75rem",
              border: "1px solid #F0D9D9", backgroundColor: "#ffffff",
              fontSize: "1rem", outline: "none", textTransform: "uppercase", letterSpacing: "1px"
            }}
          />
        </div>

      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button 
          onClick={onBack}
          disabled={isSubmitting}
          style={{
            padding: "1rem", width: "30%", borderRadius: "9999px",
            backgroundColor: "#FFF5F5", color: "#C0392B", fontWeight: 600,
            fontSize: "1.125rem", cursor: isSubmitting ? "not-allowed" : "pointer", 
            border: "1px solid #F0D9D9", transition: "all 0.2s ease", opacity: isSubmitting ? 0.5 : 1
          }}
        >
          ← Back
        </button>
        <button 
          onClick={onSubmit}
          disabled={isSubmitting}
          style={{
            flex: 1, padding: "1rem", borderRadius: "9999px",
            backgroundColor: "var(--color-primary)", color: "#ffffff", fontWeight: 600,
            fontSize: "1.125rem", cursor: isSubmitting ? "not-allowed" : "pointer", 
            border: "none", transition: "all 0.2s ease", opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? "Saving Profile..." : "Complete Setup"}
        </button>
      </div>
    </div>
  );
}
