"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RiskStatusCard from "@/components/dashboard/RiskStatusCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentPredictions from "@/components/dashboard/RecentPredictions";
import RecentReports from "@/components/dashboard/RecentReports";
import { getDashboardData, DashboardData } from "@/lib/dashboard-data";
import { RefreshCw } from "lucide-react";

/**
 * Patient Dashboard Main Page.
 * 
 * Orchestrates dashboard components and fetches actual data from the backend.
 */
export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Listen for auth state and load data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setIsLoading(true);
          const token = await user.getIdToken();
          const dashboardData = await getDashboardData(token);
          
          if (!dashboardData) {
            // Data could not be fetched or profile doesn't exist
            console.warn("Could not load dashboard data, redirecting to onboarding...");
            // Optional: redirect to onboarding
            // router.push("/onboarding");
            setData(null);
          } else {
            setData(dashboardData);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setData(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Not authenticated
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
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

  // Provide a fallback empty object so that the beautiful empty states are shown
  // if the backend hasn't generated profile data yet.
  const displayData = data || {
    profile: {
      fullName: "User",
      gestationalWeek: 0,
      edd: "",
      daysUntilDue: 0,
      conditions: [],
      provider: null
    },
    latestPrediction: null,
    recentPredictions: [],
    recentReports: []
  };

  // Handle empty states where arrays might be empty or null
  const latestPrediction = displayData.latestPrediction || null;
  const recentPredictions = displayData.recentPredictions || [];
  const recentReports = displayData.recentReports || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* ── Dashboard Header Greeting ─────────────────────────────────────── */}
      <DashboardHeader 
        fullName={displayData.profile?.fullName || "User"}
        gestationalWeek={displayData.profile?.gestationalWeek || 0}
        daysUntilDue={displayData.profile?.daysUntilDue || 0}
      />

      {/* ── Main Risk Status Hero Card ────────────────────────────────────── */}
      <RiskStatusCard prediction={latestPrediction as any} />

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
          <RecentPredictions predictions={recentPredictions} />
        </div>
        <div style={{ minWidth: 0 }}>
          <RecentReports reports={recentReports} />
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
