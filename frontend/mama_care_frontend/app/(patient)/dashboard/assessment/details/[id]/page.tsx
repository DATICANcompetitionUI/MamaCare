"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getAssessmentDetail, AssessmentResult, RISK_COLOURS } from "@/lib/dashboard-data";
import { 
  HeartPulse, 
  AlertTriangle,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";

export default function AssessmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setIsLoading(true);
          const token = await user.getIdToken();
          const data = await getAssessmentDetail(token, id);
          setResult(data);
        } catch (error) {
          console.error("Error fetching detail:", error);
          alert("Failed to load assessment details.");
          router.push("/dashboard/assessment");
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [id, router]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "1.5rem" }}>
        <div className="pulse-ring" style={{ position: "relative", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <HeartPulse size={40} color="#C0392B" />
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%", border: "4px solid #FDECEA",
            borderTopColor: "#C0392B", animation: "spin 1s linear infinite"
          }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1A1A1A", margin: "0 0 0.5rem 0" }}>Loading Assessment...</h2>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!result) return null;

  const colours = RISK_COLOURS[result.riskLevel] || RISK_COLOURS.Moderate;
  const isCritical = result.riskLevel === "Critical";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <Link href="/dashboard/assessment" style={{
          display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px",
          backgroundColor: "#FFFFFF", border: "1px solid #F0D9D9", borderRadius: "0.5rem", color: "#1A1A1A"
        }}>
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A1A1A", margin: 0 }}>Health Check Details</h1>
        </div>
      </div>

      {/* Critical Alert Overlay */}
      {isCritical && (
        <div style={{
          backgroundColor: "#DC2626", color: "white", padding: "1.5rem", borderRadius: "1rem",
          display: "flex", gap: "1rem", alignItems: "flex-start", boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)"
        }}>
          <AlertTriangle size={32} style={{ flexShrink: 0 }} />
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 0.5rem 0" }}>URGENT: Please Seek Medical Help</h2>
            <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.5, opacity: 0.9 }}>
              Your symptoms were highly concerning. Please call emergency services or go to the nearest hospital right away.
            </p>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div style={{
        backgroundColor: colours.bg, border: `1px solid ${colours.border}`,
        borderRadius: "1rem", padding: "2rem", textAlign: "center"
      }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: colours.text, margin: "0 0 1rem 0", textTransform: "uppercase" }}>
          {result.riskLevel} Risk
        </h2>
        <p style={{ fontSize: "1.125rem", color: colours.text, margin: 0, lineHeight: 1.6, maxWidth: "600px", marginInline: "auto" }}>
          {result.explanation}
        </p>
      </div>

      {/* Flagged Conditions */}
      {result.conditionsFlagged.length > 0 && (
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0D9D9", borderRadius: "1rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0 0 1rem 0", color: "#1A1A1A", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertTriangle size={20} color="#EA580C" /> Conditions to monitor
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {result.conditionsFlagged.map((cond, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9375rem", color: "#1A1A1A", fontWeight: 500 }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#EA580C" }} />
                {cond}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0D9D9", borderRadius: "1rem", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0 0 1rem 0", color: "#1A1A1A", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={20} color="#16A34A" /> What to do next
        </h3>
        <ul style={{ margin: 0, paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", color: "#1A1A1A" }}>
          {result.recommendations.map((rec, i) => (
            <li key={i} style={{ fontSize: "0.9375rem", lineHeight: 1.5 }}>{rec}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
