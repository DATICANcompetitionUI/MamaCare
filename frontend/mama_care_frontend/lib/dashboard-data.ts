/**
 * lib/dashboard-data.ts
 *
 * Mock data and types for the Patient Dashboard.
 * TODO: Replace all mock functions with real API calls to the backend.
 */

/* ── TYPES ─────────────────────────────────────────────────────────────── */

/** Risk level used across the dashboard */
export type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

/** Colour map for risk levels */
export const RISK_COLOURS: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  Low:      { bg: "#F0FDF4", text: "#166534", border: "#86EFAC" },
  Moderate: { bg: "#FEFCE8", text: "#854D0E", border: "#FDE047" },
  High:     { bg: "#FFF7ED", text: "#9A3412", border: "#FDBA74" },
  Critical: { bg: "#FEF2F2", text: "#991B1B", border: "#FCA5A5" },
};

/** Patient profile summary shown in the dashboard header */
export interface PatientProfile {
  fullName: string;
  gestationalWeek: number;
  edd: string;           // Estimated due date (ISO string)
  daysUntilDue: number;
  conditions: string[];
  provider: string | null;
}

/** A single risk prediction entry */
export interface PredictionEntry {
  id: string;
  date: string;          // ISO date string
  riskLevel: RiskLevel;
  summary: string;       // One-line plain-language summary
  systolicBP: number;
  diastolicBP: number;
  bloodGlucose: number;
  haemoglobin: number;
  heartRate: number;
  temperature: number;
  flaggedConditions: string[];
}

/** A single uploaded report entry */
export interface ReportEntry {
  id: string;
  filename: string;
  date: string;          // ISO date string
  summarySnippet: string;
}

/** Full dashboard data returned by the API */
export interface DashboardData {
  profile: PatientProfile;
  latestPrediction: PredictionEntry | null;
  recentPredictions: PredictionEntry[];
  recentReports: ReportEntry[];
}

/** Result from submitting a risk assessment */
export interface AssessmentResult {
  riskLevel: RiskLevel;
  conditionsFlagged: string[];
  explanation: string;
  recommendations: string[];
}

/** Result from uploading and interpreting a medical report */
export interface ReportInterpretation {
  summary: string;
  abnormalValues: { finding: string; meaning: string }[];
  recommendations: string[];
}

/* ── MOCK DATA ─────────────────────────────────────────────────────────── */

const MOCK_PREDICTIONS: PredictionEntry[] = [
  {
    id: "pred-001",
    date: "2026-07-02T14:30:00Z",
    riskLevel: "Low",
    summary: "All vitals within normal range. Keep up the good work!",
    systolicBP: 118, diastolicBP: 76, bloodGlucose: 92, haemoglobin: 12.1, heartRate: 78, temperature: 36.6,
    flaggedConditions: [],
  },
  {
    id: "pred-002",
    date: "2026-06-28T10:15:00Z",
    riskLevel: "Moderate",
    summary: "Slightly elevated blood pressure. Monitor closely and rest.",
    systolicBP: 135, diastolicBP: 88, bloodGlucose: 95, haemoglobin: 11.8, heartRate: 82, temperature: 36.7,
    flaggedConditions: ["Mild Hypertension"],
  },
  {
    id: "pred-003",
    date: "2026-06-24T09:00:00Z",
    riskLevel: "Low",
    summary: "Vitals look healthy. Continue with your current routine.",
    systolicBP: 120, diastolicBP: 78, bloodGlucose: 88, haemoglobin: 12.4, heartRate: 75, temperature: 36.5,
    flaggedConditions: [],
  },
  {
    id: "pred-004",
    date: "2026-06-20T16:45:00Z",
    riskLevel: "High",
    summary: "High blood pressure and low haemoglobin detected. See your midwife.",
    systolicBP: 148, diastolicBP: 95, bloodGlucose: 110, haemoglobin: 9.8, heartRate: 92, temperature: 36.8,
    flaggedConditions: ["Hypertension", "Anaemia Risk"],
  },
  {
    id: "pred-005",
    date: "2026-06-16T11:20:00Z",
    riskLevel: "Low",
    summary: "Everything looks good. Stay hydrated and eat well.",
    systolicBP: 115, diastolicBP: 74, bloodGlucose: 90, haemoglobin: 12.0, heartRate: 74, temperature: 36.5,
    flaggedConditions: [],
  },
];

const MOCK_REPORTS: ReportEntry[] = [
  { id: "rpt-001", filename: "Blood_Test_Results_June.pdf",   date: "2026-06-25T00:00:00Z", summarySnippet: "Complete blood count within normal limits. Iron levels adequate." },
  { id: "rpt-002", filename: "Ultrasound_Scan_Week28.pdf",   date: "2026-06-18T00:00:00Z", summarySnippet: "Baby growth is on track. Estimated weight 1.1kg." },
  { id: "rpt-003", filename: "Urine_Analysis_June.pdf",      date: "2026-06-10T00:00:00Z", summarySnippet: "No protein detected. Kidney function normal." },
];

const MOCK_PROFILE: PatientProfile = {
  fullName: "Amina Bello",
  gestationalWeek: 32,
  edd: "2026-08-28",
  daysUntilDue: 56,
  conditions: ["Asthma"],
  provider: "Dr. Chidinma Okafor",
};

/* ── MOCK API FUNCTIONS ────────────────────────────────────────────────── */

/**
 * Fetches the full dashboard data for the logged-in patient.
 * Returns mock data with predictions and reports.
 * TODO: Replace with GET /patient/dashboard
 */
export async function getDashboardData(): Promise<DashboardData> {
  await new Promise((r) => setTimeout(r, 600));
  return {
    profile: MOCK_PROFILE,
    latestPrediction: MOCK_PREDICTIONS[0],
    recentPredictions: MOCK_PREDICTIONS,
    recentReports: MOCK_REPORTS,
  };
}

/**
 * Fetches the dashboard data for a NEW user who hasn't done anything yet.
 * Returns empty arrays and null predictions.
 * TODO: Replace with GET /patient/dashboard (backend returns empty for new users)
 */
export async function getEmptyDashboardData(): Promise<DashboardData> {
  await new Promise((r) => setTimeout(r, 400));
  return {
    profile: {
      fullName: "New User",
      gestationalWeek: 12,
      edd: "2027-01-15",
      daysUntilDue: 196,
      conditions: [],
      provider: null,
    },
    latestPrediction: null,
    recentPredictions: [],
    recentReports: [],
  };
}

/**
 * Submits health data and returns a simulated, randomised AI risk assessment.
 * TODO: Replace with POST /predictions/assess
 */
export async function simulateAssessment(data: any): Promise<AssessmentResult> {
  // Simulate network processing delay for the AI response
  await new Promise((r) => setTimeout(r, 1800));

  const randomValue = Math.random();
  
  if (randomValue > 0.85) {
    return {
      riskLevel: "Critical",
      conditionsFlagged: ["Severe Preeclampsia Risk", "Immediate Attention Required"],
      explanation: "Your blood pressure is extremely high and the symptoms you selected indicate a critical situation. This could be severe preeclampsia, which is dangerous for both you and your baby if left untreated.",
      recommendations: [
        "Go to the nearest hospital emergency room immediately.",
        "Do not drive yourself. Have someone drive you or call for an ambulance.",
        "Take your hospital bag and all medical records with you."
      ]
    };
  } else if (randomValue > 0.6) {
    return {
      riskLevel: "High",
      conditionsFlagged: ["Hypertension", "Potential Anaemia"],
      explanation: "Your readings show elevated blood pressure and some concerning symptoms. While not an immediate emergency, it is highly recommended that you see a healthcare provider very soon to prevent complications.",
      recommendations: [
        "Schedule an appointment with your midwife or doctor within 24 hours.",
        "Rest as much as possible and lie on your left side.",
        "Monitor your baby's movements closely."
      ]
    };
  } else if (randomValue > 0.3) {
    return {
      riskLevel: "Moderate",
      conditionsFlagged: ["Mild Dehydration", "Fatigue"],
      explanation: "Most of your vitals are okay, but a few readings are slightly outside the optimal range. Your symptoms suggest you might be tired or mildly dehydrated.",
      recommendations: [
        "Drink at least 8 glasses of water today.",
        "Ensure you are getting enough rest and eating iron-rich foods.",
        "Re-take this assessment tomorrow to see if your symptoms improve."
      ]
    };
  } else {
    return {
      riskLevel: "Low",
      conditionsFlagged: [],
      explanation: "Great news! All of your vital signs and symptoms indicate a healthy, normal pregnancy track. Your body is doing a wonderful job.",
      recommendations: [
        "Continue taking your prenatal vitamins.",
        "Keep up with light exercises like walking.",
        "Attend your next scheduled antenatal clinic appointment."
      ]
    };
  }
}

/**
 * Simulates uploading a medical report and returning an AI interpretation in the chosen language.
 * TODO: Replace with POST /reports/interpret
 */
export async function simulateReportUpload(file: File, language: string): Promise<ReportInterpretation> {
  // Simulate file upload + AI processing delay
  await new Promise((r) => setTimeout(r, 2500));

  if (language === "yo") {
    // Yoruba Mock
    return {
      summary: "Eyi ni idanwo kikun ti ẹjẹ rẹ. O fihan iye awọn sẹẹli ti o wa ninu ẹjẹ rẹ.",
      abnormalValues: [
        { finding: "Haemoglobin ti o lọ silẹ (9.2 g/dL)", meaning: "Ẹjẹ rẹ ko to (anaemia), eyi wọpọ nigba oyun ṣugbọn o nilo itọju." }
      ],
      recommendations: [
        "Lo awọn oogun irin (iron) ti dokita rẹ kọ fun ọ lojoojumọ.",
        "Je awọn ounjẹ to ni irin ninu bii ẹfọ ati ẹwa."
      ]
    };
  } else if (language === "ig") {
    // Igbo Mock
    return {
      summary: "Nke a bụ ule ọbara gị niile. Ọ na-egosi etu mkpụrụ ndụ dị n'ọbara gị siri dị.",
      abnormalValues: [
        { finding: "Haemoglobin dị ala (9.2 g/dL)", meaning: "Ị nwere ụkọ ọbara (anaemia), nke a na-emekarị n'afọ ime mana ọ chọrọ nlekọta." }
      ],
      recommendations: [
        "Ṅụọ ọgwụ iron gị kwa ụbọchị dịka dọkịta kwuru.",
        "Rie nri nwere iron dịka akwụkwọ nri na agwa."
      ]
    };
  } else if (language === "ha") {
    // Hausa Mock
    return {
      summary: "Wannan gwajin jini ne na gaba ɗaya. Yana nuna adadin ƙwayoyin halitta a cikin jininka.",
      abnormalValues: [
        { finding: "Karancin Haemoglobin (9.2 g/dL)", meaning: "Kina da ƙarancin jini, wanda ya saba faruwa lokacin ciki amma yana buƙatar kulawa." }
      ],
      recommendations: [
        "Ki sha magungunan ƙara jini (iron) kowace rana.",
        "Ki ci abincin da ke ƙara jini kamar ganye da wake."
      ]
    };
  }

  // English Mock (default)
  return {
    summary: "This is a complete blood count test. It shows the levels of different cells in your blood.",
    abnormalValues: [
      { 
        finding: "Low Haemoglobin (9.2 g/dL)", 
        meaning: "You have mild anaemia, which is common in pregnancy but needs attention." 
      }
    ],
    recommendations: [
      "Take your prescribed iron supplements daily.",
      "Eat more iron-rich foods like spinach and beans."
    ]
  };
}
