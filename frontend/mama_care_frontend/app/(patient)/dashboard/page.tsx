"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RiskStatusCard from "@/components/dashboard/RiskStatusCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentPredictions from "@/components/dashboard/RecentPredictions";
import RecentReports from "@/components/dashboard/RecentReports";
import { 
  getDashboardData, 
  getEmptyDashboardData, 
  DashboardData 
} from "@/lib/dashboard-data";
import { RefreshCw, UserCheck, UserPlus } from "lucide-react";

/**
 * Patient Dashboard Main Page.
 * 
 * Orchestrates dashboard components and fetches data. Contains a toggle at the top
 * to preview both the populated (mock history) and empty (new user) states.
 */
export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isEmptyState, setIsEmptyState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load dashboard data whenever state toggle changes
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const dashboardData = isEmptyState 
        ? await getEmptyDashboardData() 
        : await getDashboardData();
      setData(dashboardData);
      setIsLoading(false);
    }
    loadData();
  }, [isEmptyState]);

  if (isLoading || !data) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "1rem"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "4px solid #F0D9D9",
          borderTopColor: "#C0392B",
          animation: "spin 1s linear infinite"
        }} />
        <span style={{ color: "#6B7280", fontSize: "0.9375rem", fontWeight: 500 }}>
          Loading your pregnancy dashboard...
        </span>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* ── Preview Mode Toggle Bar ────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        border: "1px solid #F0D9D9",
        borderRadius: "0.75rem",
        padding: "0.75rem 1rem",
        fontSize: "0.875rem",
        gap: "1rem",
        flexWrap: "wrap"
      }}>
        <span style={{ color: "#6B7280", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RefreshCw size={14} style={{ animation: isLoading ? "spin 1.5s linear infinite" : "none" }} />
          Previewing dashboard state:
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setIsEmptyState(false)}
            style={{
              padding: "0.375rem 0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid",
              borderColor: !isEmptyState ? "#C0392B" : "#F0D9D9",
              backgroundColor: !isEmptyState ? "#FFF5F5" : "#FFFFFF",
              color: !isEmptyState ? "#C0392B" : "#6B7280",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.8125rem",
              transition: "all 0.2s ease"
            }}
          >
            <UserCheck size={14} />
            Amina (Populated)
          </button>
          <button
            onClick={() => setIsEmptyState(true)}
            style={{
              padding: "0.375rem 0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid",
              borderColor: isEmptyState ? "#C0392B" : "#F0D9D9",
              backgroundColor: isEmptyState ? "#FFF5F5" : "#FFFFFF",
              color: isEmptyState ? "#C0392B" : "#6B7280",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.8125rem",
              transition: "all 0.2s ease"
            }}
          >
            <UserPlus size={14} />
            New User (Empty)
          </button>
        </div>
      </div>

      {/* ── Dashboard Header Greeting ─────────────────────────────────────── */}
      <DashboardHeader 
        fullName={data.profile.fullName}
        gestationalWeek={data.profile.gestationalWeek}
        daysUntilDue={data.profile.daysUntilDue}
      />

      {/* ── Main Risk Status Hero Card ────────────────────────────────────── */}
      <RiskStatusCard prediction={data.latestPrediction} />

      {/* ── Quick Actions Row ─────────────────────────────────────────────── */}
      <QuickActions />

      {/* ── Recent History: Timeline & Reports ─────────────────────────────── */}
      <div 
        className="dashboard-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
          gap: "1.5rem",
          alignItems: "flex-start",
          marginTop: "0.5rem"
        }}
      >
        <div style={{ minWidth: 0 }}>
          <RecentPredictions predictions={data.recentPredictions} />
        </div>
        <div style={{ minWidth: 0 }}>
          <RecentReports reports={data.recentReports} />
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
