import { OnboardingData } from "@/lib/placeholder-data";
import CustomDatePicker from "@/components/ui/CustomDatePicker";

interface Step2Props {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Pregnancy({ data, updateData, onNext, onBack }: Step2Props) {
  
  // Basic validation
  const isValid = data.gestationalWeek > 0 && data.edd !== "";

  // Auto-calculate EDD when gestational week changes
  const handleGestationalWeekChange = (weeks: number) => {
    updateData({ gestationalWeek: weeks });
    
    // Roughly estimate EDD: 40 weeks - current weeks = weeks left
    if (weeks > 0 && weeks <= 42) {
      const weeksLeft = 40 - weeks;
      const today = new Date();
      today.setDate(today.getDate() + (weeksLeft * 7));
      
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      
      updateData({ edd: `${yyyy}-${mm}-${dd}` });
    }
  };

  // Validation: Live births cannot exceed total pregnancies
  const handlePregnanciesChange = (val: number) => {
    const newPreg = Math.max(0, val);
    if (newPreg < data.prevLiveBirths) {
      updateData({ prevPregnancies: newPreg, prevLiveBirths: newPreg });
    } else {
      updateData({ prevPregnancies: newPreg });
    }
  };

  const handleBirthsChange = (val: number) => {
    const newBirths = Math.max(0, val);
    if (newBirths > data.prevPregnancies) {
      updateData({ prevLiveBirths: newBirths, prevPregnancies: newBirths });
    } else {
      updateData({ prevLiveBirths: newBirths });
    }
  };

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "0.5rem" }}>
        Tell us about your pregnancy
      </h2>
      <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
        This helps MamaCare AI track your baby's growth and give you the right advice.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2.5rem" }}>
        
        {/* Gestational Week Stepper */}
        <div>
          <label style={{ display: "block", fontSize: "1rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.75rem" }}>
            How many weeks pregnant are you?
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button 
              onClick={() => handleGestationalWeekChange(Math.max(0, data.gestationalWeek - 1))}
              style={{
                width: "50px", height: "50px", borderRadius: "50%",
                border: "2px solid #F0D9D9", backgroundColor: "#FFF5F5",
                fontSize: "1.5rem", color: "#C0392B", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >-</button>
            <div style={{ 
              flex: 1, textAlign: "center", fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A",
              border: "1px solid #F0D9D9", borderRadius: "0.75rem", padding: "0.75rem", backgroundColor: "#fff"
            }}>
              {data.gestationalWeek > 0 ? `${data.gestationalWeek} Weeks` : "Not sure"}
            </div>
            <button 
              onClick={() => handleGestationalWeekChange(Math.min(42, data.gestationalWeek + 1))}
              style={{
                width: "50px", height: "50px", borderRadius: "50%",
                border: "2px solid #F0D9D9", backgroundColor: "#FFF5F5",
                fontSize: "1.5rem", color: "#C0392B", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >+</button>
          </div>
        </div>

        {/* Estimated Due Date */}
        <div>
          <label style={{ display: "block", fontSize: "1rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
            Estimated Due Date
          </label>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "0.75rem" }}>
            We've calculated this for you, but you can change it if your doctor gave you a different date.
          </p>
          <CustomDatePicker 
            value={data.edd}
            onChange={(val) => updateData({ edd: val })}
            placeholder="Tap to select your due date"
            minYear={new Date().getFullYear()}
            maxYear={new Date().getFullYear() + 1}
          />
        </div>

        {/* Previous Pregnancies Steppers (Grouped) */}
        <div style={{ display: "flex", gap: "1rem" }}>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
              Previous Pregnancies
            </label>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #F0D9D9", borderRadius: "0.75rem", backgroundColor: "#fff", overflow: "hidden" }}>
              <button 
                onClick={() => handlePregnanciesChange(data.prevPregnancies - 1)}
                style={{ padding: "0.75rem 1rem", backgroundColor: "#FFF5F5", color: "#C0392B", fontWeight: 700, border: "none", borderRight: "1px solid #F0D9D9", cursor: "pointer" }}
              >-</button>
              <div style={{ flex: 1, textAlign: "center", fontWeight: 600 }}>{data.prevPregnancies}</div>
              <button 
                onClick={() => handlePregnanciesChange(data.prevPregnancies + 1)}
                style={{ padding: "0.75rem 1rem", backgroundColor: "#FFF5F5", color: "#C0392B", fontWeight: 700, border: "none", borderLeft: "1px solid #F0D9D9", cursor: "pointer" }}
              >+</button>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
              Previous Births
            </label>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #F0D9D9", borderRadius: "0.75rem", backgroundColor: "#fff", overflow: "hidden" }}>
              <button 
                onClick={() => handleBirthsChange(data.prevLiveBirths - 1)}
                style={{ padding: "0.75rem 1rem", backgroundColor: "#FFF5F5", color: "#C0392B", fontWeight: 700, border: "none", borderRight: "1px solid #F0D9D9", cursor: "pointer" }}
              >-</button>
              <div style={{ flex: 1, textAlign: "center", fontWeight: 600 }}>{data.prevLiveBirths}</div>
              <button 
                onClick={() => handleBirthsChange(data.prevLiveBirths + 1)}
                style={{ padding: "0.75rem 1rem", backgroundColor: "#FFF5F5", color: "#C0392B", fontWeight: 700, border: "none", borderLeft: "1px solid #F0D9D9", cursor: "pointer" }}
              >+</button>
            </div>
          </div>

        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button 
          onClick={onBack}
          style={{
            padding: "1rem", width: "30%", borderRadius: "9999px",
            backgroundColor: "#FFF5F5", color: "#C0392B", fontWeight: 600,
            fontSize: "1.125rem", cursor: "pointer", border: "1px solid #F0D9D9", transition: "all 0.2s ease",
          }}
        >
          ← Back
        </button>
        <button 
          onClick={onNext}
          disabled={!isValid}
          style={{
            flex: 1, padding: "1rem", borderRadius: "9999px",
            backgroundColor: isValid ? "var(--color-primary)" : "#F0D9D9",
            color: isValid ? "#ffffff" : "#9CA3AF", fontWeight: 600,
            fontSize: "1.125rem", cursor: isValid ? "pointer" : "not-allowed", transition: "all 0.2s ease", border: "none",
          }}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
