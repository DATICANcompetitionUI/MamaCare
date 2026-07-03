import { User, Baby, ClipboardList } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = [
    { num: 1, label: "Personal", Icon: User },
    { num: 2, label: "Pregnancy", Icon: Baby },
    { num: 3, label: "Health", Icon: ClipboardList },
  ];

  return (
    <div style={{ marginBottom: "2rem", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
        
        {/* The background connecting line */}
        <div style={{
          position: "absolute",
          top: "20px",
          left: "15%",
          right: "15%",
          height: "2px",
          backgroundColor: "#F0D9D9",
          zIndex: 0,
        }} />
        
        {/* The active connecting line */}
        <div style={{
          position: "absolute",
          top: "20px",
          left: "15%",
          width: currentStep === 1 ? "0%" : currentStep === 2 ? "35%" : "70%",
          height: "2px",
          backgroundColor: "#C0392B",
          zIndex: 0,
          transition: "width 0.3s ease",
        }} />

        {steps.map(({ num, label, Icon }) => {
          const isActive = currentStep === num;
          const isCompleted = currentStep > num;
          
          return (
            <div key={num} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, flex: 1 }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isCompleted || isActive ? "#C0392B" : "#FFF5F5",
                color: isCompleted || isActive ? "#ffffff" : "#E5A09A",
                border: `2px solid ${isCompleted || isActive ? "#C0392B" : "#F0D9D9"}`,
                transition: "all 0.3s ease",
                boxShadow: isActive ? "0 4px 12px rgba(192,57,43,0.2)" : "none",
              }}>
                <Icon size={20} />
              </div>
              <span style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: isActive ? 700 : 600,
                color: isActive ? "#1A1A1A" : "#9CA3AF",
              }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
