/**
 * lib/placeholder-data.ts
 *
 * Central home for ALL mock/stub data and placeholder API functions.
 * Every function here simulates what a real backend API call will return.
 *
 * HOW TO USE:
 *   Import the function you need, use it exactly like a real async API call.
 *   When the backend is ready, replace the function body with a real fetch()
 *   call — the return type stays the same so nothing else needs to change.
 *
 * NAMING CONVENTION:
 *   All placeholder functions are named getXxx() and are async.
 *   They are marked with a TODO comment showing which backend endpoint replaces them.
 */

import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail
} from "firebase/auth";

/* ── TYPES ─────────────────────────────────────────────────────────────────── */

/** Statistics shown in the landing page Stats section */
export interface PlatformStats {
  maternalDeathStat: string;  // e.g. "~20%"
  maternalDeathLabel: string; // explanation of the stat
  languagesCount: string;     // e.g. "4"
  languagesLabel: string;     // explanation
  analysisType: string;       // e.g. "Real-time"
  analysisLabel: string;      // explanation
}

/** A single patient summary row for the provider dashboard mock */
export interface MockPatient {
  name: string;
  gestationalWeek: string;
  riskLevel: "Low" | "Moderate" | "High" | "Critical";
  lastAssessment: string;
}

/* ── LANDING PAGE ───────────────────────────────────────────────────────────── */

/**
 * Returns platform impact statistics for the landing page Stats section.
 * TODO: Replace with GET /api/stats once the backend endpoint is live.
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  return {
    maternalDeathStat: "~20%",
    maternalDeathLabel: "of global maternal deaths occur in Nigeria",
    languagesCount: "4",
    languagesLabel: "Nigerian languages supported (EN, YO, IG, HA)",
    analysisType: "Real-time",
    analysisLabel: "AI-powered risk analysis in under 10 seconds",
  };
}

/**
 * Returns a small list of mock patients for the provider dashboard preview
 * shown on the landing page's "For Healthcare Providers" section.
 * TODO: Replace with GET /provider/patients once the backend is ready.
 */
export function getMockPatients(): MockPatient[] {
  return [
    { name: "Amina Bello",      gestationalWeek: "32 wks", riskLevel: "Critical", lastAssessment: "2h ago" },
    { name: "Grace Okonkwo",    gestationalWeek: "28 wks", riskLevel: "Moderate", lastAssessment: "1d ago" },
    { name: "Blessing Adeyemi", gestationalWeek: "36 wks", riskLevel: "Low",      lastAssessment: "3d ago" },
  ];
}

/* ═══════════════════════════════════════════════════════════════════════════
   ONBOARDING — placeholder functions
   ═══════════════════════════════════════════════════════════════════════════ */

/** Standard list of all 36 Nigerian States + FCT for dropdowns */
export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara"
];

/** Full data collected across all 3 steps of the onboarding wizard */
export interface OnboardingData {
  // Step 1
  dob: string;
  state: string;
  lga: string;
  phone: string;
  // Step 2
  gestationalWeek: number;
  edd: string; // Estimated Due Date
  prevPregnancies: number;
  prevLiveBirths: number;
  // Step 3
  conditions: string[];
  allergies: string;
  medications: string;
  providerCode: string;
}

/**
 * Placeholder: Saves the patient's onboarding profile.
 * TODO: Replace with POST /user/onboarding (requires Bearer token from Firebase Auth)
 */
export async function submitOnboarding(data: OnboardingData): Promise<{ success: boolean; error?: string }> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1200));

  // Simulate success
  console.log("Mock saved onboarding data:", data);
  return { success: true };
}

/* ═══════════════════════════════════════════════════════════════════════════
   AUTH — placeholder functions
   ═══════════════════════════════════════════════════════════════════════════ */

/** Supported languages a user can pick as their preferred language */
export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "yo", label: "Yoruba" },
  { code: "ig", label: "Igbo" },
  { code: "ha", label: "Hausa" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

/** User role — determines which form fields are shown and which routes they access */
export type UserRole = "patient" | "provider";

/** Payload sent to the register endpoint */
export interface RegisterPayload {
  role: UserRole;
  fullName: string;
  email: string;
  password: string;
  preferredLanguage: LanguageCode; // patients only
  licenceNumber: string;           // providers only
  facilityName: string;            // providers only
}

/** Standard response shape for auth actions */
export interface AuthResult {
  success: boolean;
  /** Human-readable error shown to the user on failure */
  error?: string;
  /** On success: where to redirect the user next */
  redirectTo?: string;
  /** Firebase JWT to send to backend for verification */
  token?: string;
}

/**
 * Registers a new user (patient or provider) via Firebase Auth.
 * TODO: Add POST /auth/register call here to save the profile data (role, fullName, etc.)
 *
 * @param payload - Form data collected from the registration form
 * @returns AuthResult with success flag, redirect path, and JWT
 */
export async function registerUser(payload: RegisterPayload): Promise<AuthResult> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    const token = await userCredential.user.getIdToken();
    
    // In a full app, we would also save the additional payload data (fullName, role, etc.) 
    // to our custom backend using this token.
    
    const redirectTo = payload.role === "patient" ? "/onboarding" : "/provider";
    return { success: true, redirectTo, token };
  } catch (error: unknown) {
    let errorMessage = "An error occurred during registration. Please try again.";
    
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists. Try signing in instead.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      }
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Signs an existing user in with email + password via Firebase Auth.
 *
 * @param email    - User's registered email
 * @param password - User's password
 * @returns AuthResult with success flag, redirect path, and JWT
 */
export async function loginUser(email: string, password: string): Promise<AuthResult> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    // In reality the role would come from the backend profile.
    // For now we redirect everyone to the patient dashboard.
    return { success: true, redirectTo: "/dashboard", token };
  } catch (error: unknown) {
    let errorMessage = "Incorrect email or password. Please try again.";
    
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "Incorrect email or password. Please try again.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
      }
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Sends a password reset email via Firebase Auth.
 *
 * @param email - The email address to send the reset link to
 * @returns AuthResult — always succeeds in this implementation (even for unknown emails,
 *          which is the correct security behaviour — don't reveal whether an email exists)
 */
export async function sendPasswordReset(email: string): Promise<AuthResult> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: unknown) {
    // Intentionally returns success even for unknown emails (standard security practice)
    return { success: true };
  }
}
