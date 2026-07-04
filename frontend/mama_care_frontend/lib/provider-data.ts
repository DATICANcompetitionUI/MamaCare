/**
 * lib/provider-data.ts
 *
 * Mock data and types for the Provider Dashboard.
 * TODO: Replace with real backend API calls.
 */

export type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

export interface AssignedPatient {
  id: string;
  fullName: string;
  gestationalWeek: number;
  lastAssessmentDate: string; // ISO string
  lastRiskLevel: RiskLevel;
  conditionsFlagged: string[];
  daysUntilDue: number;
}

export interface ProviderDashboardData {
  providerName: string;
  providerCode: string;
  facilityName: string;
  patients: AssignedPatient[];
}

export const MOCK_PROVIDER_DATA_FILLED: ProviderDashboardData = {
  providerName: "Nurse Chidinma",
  providerCode: "NUR-824",
  facilityName: "Lagos Maternity Clinic",
  patients: [
    {
      id: "pat-101",
      fullName: "Amina Bello",
      gestationalWeek: 32,
      lastAssessmentDate: "2026-07-02T14:30:00Z",
      lastRiskLevel: "Low",
      conditionsFlagged: [],
      daysUntilDue: 56,
    },
    {
      id: "pat-102",
      fullName: "Blessing Okafor",
      gestationalWeek: 36,
      lastAssessmentDate: "2026-07-03T09:15:00Z",
      lastRiskLevel: "Critical",
      conditionsFlagged: ["Severe Hypertension", "Preeclampsia Risk"],
      daysUntilDue: 28,
    },
    {
      id: "pat-103",
      fullName: "Fatima Yusuf",
      gestationalWeek: 24,
      lastAssessmentDate: "2026-07-01T11:00:00Z",
      lastRiskLevel: "Moderate",
      conditionsFlagged: ["Mild Anaemia"],
      daysUntilDue: 112,
    },
    {
      id: "pat-104",
      fullName: "Grace Etim",
      gestationalWeek: 18,
      lastAssessmentDate: "2026-06-28T16:45:00Z",
      lastRiskLevel: "High",
      conditionsFlagged: ["Gestational Diabetes Risk"],
      daysUntilDue: 154,
    },
    {
      id: "pat-105",
      fullName: "Zainab Ali",
      gestationalWeek: 38,
      lastAssessmentDate: "2026-07-03T08:00:00Z",
      lastRiskLevel: "Low",
      conditionsFlagged: [],
      daysUntilDue: 14,
    },
  ],
};

export const MOCK_PROVIDER_DATA_EMPTY: ProviderDashboardData = {
  providerName: "Nurse Chidinma",
  providerCode: "NUR-824",
  facilityName: "Lagos Maternity Clinic",
  patients: [],
};

// Import from dashboard-data for full history types
import { PredictionEntry, ReportEntry, PatientProfile } from "./dashboard-data";

export interface PatientDetails {
  id: string;
  profile: PatientProfile;
  predictions: PredictionEntry[];
  reports: ReportEntry[];
}

// Full detailed mock data for our top critical patient (pat-102)
export const MOCK_PATIENT_DETAILS: Record<string, PatientDetails> = {
  "pat-102": {
    id: "pat-102",
    profile: {
      fullName: "Blessing Okafor",
      gestationalWeek: 36,
      edd: "2026-07-31",
      daysUntilDue: 28,
      conditions: ["Asthma", "Previous Preterm Birth"],
      provider: "Nurse Chidinma",
    },
    predictions: [
      {
        id: "pred-201",
        date: "2026-07-03T09:15:00Z",
        riskLevel: "Critical",
        summary: "Severely elevated blood pressure and protein detected. Immediate medical attention required.",
        systolicBP: 165,
        diastolicBP: 110,
        bloodGlucose: 105,
        haemoglobin: 11.2,
        heartRate: 98,
        temperature: 36.8,
        flaggedConditions: ["Severe Hypertension", "Preeclampsia Risk"],
      },
      {
        id: "pred-202",
        date: "2026-06-25T14:30:00Z",
        riskLevel: "High",
        summary: "Blood pressure is rising steadily. Monitor closely.",
        systolicBP: 145,
        diastolicBP: 95,
        bloodGlucose: 98,
        haemoglobin: 11.5,
        heartRate: 88,
        temperature: 36.7,
        flaggedConditions: ["Hypertension"],
      },
      {
        id: "pred-203",
        date: "2026-06-10T10:00:00Z",
        riskLevel: "Moderate",
        summary: "Slightly elevated BP. Reduce salt intake and rest.",
        systolicBP: 132,
        diastolicBP: 85,
        bloodGlucose: 95,
        haemoglobin: 12.0,
        heartRate: 82,
        temperature: 36.6,
        flaggedConditions: ["Mild Hypertension"],
      }
    ],
    reports: [
      {
        id: "rpt-201",
        filename: "Urine_Analysis_July3.pdf",
        date: "2026-07-03T08:00:00Z",
        summarySnippet: "High levels of protein (+3) detected in urine. Indicative of potential preeclampsia."
      },
      {
        id: "rpt-202",
        filename: "Complete_Blood_Count.pdf",
        date: "2026-06-20T00:00:00Z",
        summarySnippet: "Platelets slightly lower than normal range. Hb within normal limits."
      }
    ]
  }
};

/**
 * Simulate fetching detailed data for a specific patient.
 */
export async function getPatientDetails(id: string): Promise<PatientDetails | null> {
  await new Promise(r => setTimeout(r, 600)); // Simulate network delay
  
  // Return the specific mock data if available, or generate a generic one for other IDs
  if (MOCK_PATIENT_DETAILS[id]) {
    return MOCK_PATIENT_DETAILS[id];
  }

  // Fallback generic data for other patients
  return {
    id,
    profile: {
      fullName: "Patient " + id.split('-')[1],
      gestationalWeek: 28,
      edd: "2026-09-25",
      daysUntilDue: 84,
      conditions: [],
      provider: "Nurse Chidinma",
    },
    predictions: [],
    reports: [],
  };
}
