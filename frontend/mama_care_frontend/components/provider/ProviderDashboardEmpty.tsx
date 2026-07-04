"use client";

import { ProviderDashboardData } from "@/lib/provider-data";
import { UserPlus, ClipboardList, Activity } from "lucide-react";
import Link from "next/link";

/**
 * components/provider/ProviderDashboardEmpty.tsx
 *
 * Shown when the provider has 0 assigned patients.
 */

export default function ProviderDashboardEmpty({ data }: { data: ProviderDashboardData }) {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem", maxWidth: "600px", margin: "0 auto" }}>
      <div 
        style={{ 
          width: "80px", 
          height: "80px", 
          backgroundColor: "#FFF5F5", 
          borderRadius: "50%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          margin: "0 auto 1.5rem" 
        }}
      >
        <UserPlus size={40} color="#C0392B" />
      </div>

      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "1rem" }}>
        Welcome, {data.providerName}!
      </h2>
      
      <p style={{ color: "#4B5563", fontSize: "1.125rem", marginBottom: "2rem", lineHeight: 1.6 }}>
        Your dashboard is currently empty because you haven't been linked with any patients yet. 
        Start monitoring your patients remotely by sharing your unique Provider Code.
      </p>

      <div 
        style={{ 
          backgroundColor: "#FFFFFF", 
          border: "2px dashed #E5E7EB", 
          borderRadius: "1rem", 
          padding: "2rem",
          marginBottom: "3rem"
        }}
      >
        <p style={{ color: "#6B7280", fontSize: "0.875rem", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
          Your Provider Code
        </p>
        <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#C0392B", letterSpacing: "0.1em" }}>
          {data.providerCode}
        </div>
        <p style={{ color: "#6B7280", fontSize: "0.875rem", marginTop: "1rem" }}>
          Ask your patients to enter this code during their registration or in their profile settings.
        </p>
      </div>

      <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "1.5rem" }}>
        What happens next?
      </h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", textAlign: "left" }}>
        <div style={{ padding: "1.5rem", backgroundColor: "#FFFFFF", borderRadius: "1rem", border: "1px solid #F3F4F6" }}>
          <Activity size={24} color="#C0392B" style={{ marginBottom: "1rem" }} />
          <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Real-time Risk Alerts</h4>
          <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>Get notified immediately if a patient logs concerning vitals or symptoms.</p>
        </div>
        <div style={{ padding: "1.5rem", backgroundColor: "#FFFFFF", borderRadius: "1rem", border: "1px solid #F3F4F6" }}>
          <ClipboardList size={24} color="#C0392B" style={{ marginBottom: "1rem" }} />
          <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Full Patient History</h4>
          <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>View past assessments, AI-simplified lab reports, and add your own clinical notes.</p>
        </div>
      </div>
    </div>
  );
}
