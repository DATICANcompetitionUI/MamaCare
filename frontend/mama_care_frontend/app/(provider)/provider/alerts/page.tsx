"use client";

import { useState } from "react";
import { MOCK_PROVIDER_DATA_FILLED, MOCK_PROVIDER_DATA_EMPTY, RiskLevel } from "@/lib/provider-data";
import { AlertCircle, ChevronRight, Activity, Code2 } from "lucide-react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";

const RISK_STYLES: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  Low: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  Moderate: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  High: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  Critical: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

export default function AlertsPage() {
  const [isEmptyState, setIsEmptyState] = useState(false);
  const data = isEmptyState ? MOCK_PROVIDER_DATA_EMPTY : MOCK_PROVIDER_DATA_FILLED;

  // Only show Critical and High risk patients
  const alertPatients = data.patients
    .filter(p => p.lastRiskLevel === "Critical" || p.lastRiskLevel === "High")
    .sort((a, b) => {
      const weight = { Critical: 2, High: 1, Moderate: 0, Low: 0 };
      if (weight[a.lastRiskLevel] !== weight[b.lastRiskLevel]) {
        return weight[b.lastRiskLevel] - weight[a.lastRiskLevel];
      }
      return new Date(b.lastAssessmentDate).getTime() - new Date(a.lastAssessmentDate).getTime();
    });

  return (
    <div className="pb-12 space-y-6">
      {/* Dev Toggle Button - Only for demonstration purposes */}
      <div className="bg-gray-800 text-white p-3 rounded-lg flex items-center justify-between mb-4 shadow-md relative z-20">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium">Dev Toggle:</span>
        </div>
        <button
          onClick={() => setIsEmptyState(!isEmptyState)}
          className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-md text-sm font-medium transition-colors border border-white/20"
        >
          Switch to {isEmptyState ? "Filled State" : "Empty State"}
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Active Alerts</h1>
        <p className="text-gray-500">Patients requiring immediate review or intervention.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">High Priority ({alertPatients.length})</h2>
          </div>
        </div>

        {alertPatients.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-900 mb-1">No Active Alerts</p>
            <p>All your assigned patients are currently stable.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {alertPatients.map(patient => (
              <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${RISK_STYLES[patient.lastRiskLevel].bg} ${RISK_STYLES[patient.lastRiskLevel].text} ${RISK_STYLES[patient.lastRiskLevel].border}`}>
                      {patient.lastRiskLevel === "Critical" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {patient.lastRiskLevel} RISK
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(patient.lastAssessmentDate), { addSuffix: true })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{patient.fullName}</h3>
                  <p className="text-sm text-gray-600">
                    Gestational Age: <span className="font-medium text-gray-900">Week {patient.gestationalWeek}</span>
                  </p>
                  {patient.conditionsFlagged.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {patient.conditionsFlagged.map((cond, i) => (
                        <span key={i} className="inline-block bg-red-100 text-red-700 border border-red-200 text-xs px-2 py-0.5 rounded font-medium">
                          {cond}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mt-2 md:mt-0 md:pl-4 md:border-l md:border-gray-200">
                  <Link 
                    href={`/provider/patients/${patient.id}`}
                    className="inline-flex items-center justify-center w-full md:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Review Patient
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
