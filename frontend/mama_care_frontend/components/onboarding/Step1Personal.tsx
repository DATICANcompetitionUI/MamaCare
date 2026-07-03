import { OnboardingData, NIGERIAN_STATES } from "@/lib/placeholder-data";
import CustomDatePicker from "@/components/ui/CustomDatePicker";

interface Step1Props {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export default function Step1Personal({ data, updateData, onNext }: Step1Props) {
  
  const isValid = data.dob && data.state && data.lga && data.phone;

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "0.5rem" }}>
        Let's get to know you
      </h2>
      <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
        We need a few details to set up your personal health profile.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
        
        {/* DOB Input */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
            Date of Birth
          </label>
          <CustomDatePicker 
            value={data.dob}
            onChange={(val) => updateData({ dob: val })}
            placeholder="Tap to select your birthday"
            minYear={1950}
            maxYear={new Date().getFullYear() - 13} // Require at least 13 yrs old
          />
        </div>

        {/* State Dropdown */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
            State of Residence
          </label>
          <select
            value={data.state}
            onChange={(e) => updateData({ state: e.target.value })}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid #F0D9D9",
              backgroundColor: "#ffffff",
              fontSize: "1rem",
              outline: "none",
              appearance: "none", // Will use default arrow or we can style it
            }}
          >
            <option value="" disabled>Select your state</option>
            {NIGERIAN_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* LGA Input */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
            Local Government Area (LGA)
          </label>
          <input 
            type="text" 
            placeholder="E.g. Ikeja"
            value={data.lga}
            onChange={(e) => updateData({ lga: e.target.value })}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid #F0D9D9",
              backgroundColor: "#ffffff",
              fontSize: "1rem",
              outline: "none",
            }}
          />
        </div>

        {/* Phone Input */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "0.5rem" }}>
            Phone Number
          </label>
          <input 
            type="tel" 
            placeholder="0801 234 5678"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid #F0D9D9",
              backgroundColor: "#ffffff",
              fontSize: "1rem",
              outline: "none",
            }}
          />
        </div>
      </div>

      <button 
        onClick={onNext}
        disabled={!isValid}
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "9999px",
          backgroundColor: isValid ? "var(--color-primary)" : "#F0D9D9",
          color: isValid ? "#ffffff" : "#9CA3AF",
          fontWeight: 600,
          fontSize: "1.125rem",
          cursor: isValid ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
          border: "none",
        }}
      >
        Next Step →
      </button>
    </div>
  );
}
