**MamaCare AI**

*Maternal Health Intelligence Platform*

**Software Requirements Specification (SRS)**

Version 1.0 \| June 2026

*Hackathon Submission Document*

**PREPARED BY**

**Indubitable Team**

Frontend Developer \| Backend Developer

**1. Executive Summary**

MamaCare AI is a web-based maternal health intelligence platform
designed to reduce preventable maternal mortality and morbidity across
Nigeria and other sub-Saharan African regions. The platform serves two
primary user groups: pregnant women who need accessible health guidance,
and healthcare providers (midwives and doctors) who need efficient tools
to monitor and manage their patients remotely.

The platform combines AI-powered risk prediction, intelligent medical
report interpretation, and a multilingual voice assistant to bridge the
gap between under-resourced healthcare facilities and the women who need
care most. By supporting English, Yoruba, Igbo, and Hausa, MamaCare AI
reaches the broadest possible audience across Nigeria\'s linguistic
landscape.

**1.1 Problem Statement**

Nigeria accounts for approximately 20% of global maternal deaths, with
preventable conditions such as preeclampsia, gestational diabetes,
anemia, and hypertension being the leading causes. Key barriers include:

-   Limited access to skilled healthcare workers, especially in rural
    areas

-   Low health literacy --- patients cannot understand their own medical
    reports

-   Language barriers that exclude non-English speakers from digital
    health tools

-   Lack of continuous monitoring between clinic visits

-   Midwives managing too many patients without decision-support tools

**1.2 Solution**

MamaCare AI addresses these barriers through three intelligent modules
working together:

-   Risk Prediction Engine --- collects vital signs and pregnancy data
    to predict health risks before they become emergencies

-   Medical Report Interpreter --- converts complex lab results and
    medical documents into plain, simple language the patient can
    understand

-   Multilingual Voice Assistant --- allows users to ask maternal health
    questions by voice, in their preferred language

**2. Product Vision & Scope**

**2.1 Vision Statement**

> *\"To be the most accessible maternal health companion for every
> pregnant woman in Nigeria --- regardless of language, location, or
> literacy level.\"*

**2.2 In Scope (Version 1.0)**

-   Patient registration, onboarding, and profile management

-   Maternal risk prediction from health data input

-   Medical report upload and AI-powered simplified explanation

-   Multilingual voice assistant (English, Yoruba, Igbo, Hausa)

-   Patient prediction history dashboard

-   Healthcare provider dashboard for patient monitoring

-   Role-based access control (Patient vs. Provider)

-   Secure authentication via Firebase Auth

**2.3 Out of Scope (Version 1.0)**

-   Native mobile applications (iOS / Android)

-   Direct telemedicine / video consultation

-   Payment processing or insurance integration

-   Integration with hospital Electronic Health Record (EHR) systems

-   Custom AI model training (using API-based AI services)

**3. User Personas**

**3.1 Persona 1 --- Pregnant Patient**

  ---------------- ------------------------------------------------------
  **Attribute**    **Details**

  **Name**         Amina (representative)

  **Age**          24 years old, first pregnancy

  **Language**     Hausa (primary), limited English

  **Tech           Basic smartphone use; no medical background
  Literacy**       

  **Goals**        Understand her health status, know if her baby is
                   safe, get answers in Hausa

  **Pain Points**  Cannot read lab results; nearest clinic is 40km away;
                   afraid to miss danger signs
  ---------------- ------------------------------------------------------

**3.2 Persona 2 --- Healthcare Provider**

  ---------------- ------------------------------------------------------
  **Attribute**    **Details**

  **Name**         Nurse Chidinma (representative)

  **Role**         Community midwife managing 80+ patients across 3
                   villages

  **Language**     Igbo, English

  **Tech           Comfortable with smartphones and basic web apps
  Literacy**       

  **Goals**        Monitor high-risk patients remotely; get alerts when a
                   patient\'s risk level changes

  **Pain Points**  Cannot visit all patients frequently; paper records
                   are hard to track; misses early warning signs
  ---------------- ------------------------------------------------------

**4. User Stories**

**4.1 Patient User Stories**

  -------- --------------------------------- ---------------- ----------------
  **ID**   **User Story**                    **Priority**     **Feature**

  US-01    As a patient, I want to register  Must Have        Auth / Profile
           and create my health profile so                    
           that MamaCare AI can personalise                   
           recommendations for me.                            

  US-02    As a patient, I want to input my  Must Have        Risk Prediction
           blood pressure, blood sugar, and                   
           symptoms so that the system can                    
           predict my risk level.                             

  US-03    As a patient, I want to upload my Must Have        Report
           lab report and receive a simple                    Interpreter
           explanation in my language so                      
           that I understand my results.                      

  US-04    As a patient, I want to ask       Must Have        Voice Assistant
           health questions by voice in                       
           Yoruba, Igbo, or Hausa so that                     
           the language barrier does not                      
           prevent me from getting help.                      

  US-05    As a patient, I want to view my   Must Have        Dashboard
           past risk predictions so that I                    
           can track my health trend over my                  
           pregnancy.                                         

  US-06    As a patient, I want to receive   Should Have      Risk Prediction
           recommendations after each risk                    
           assessment so that I know what                     
           action to take next.                               
  -------- --------------------------------- ---------------- ----------------

**4.2 Healthcare Provider User Stories**

  -------- --------------------------------- ---------------- ----------------
  **ID**   **User Story**                    **Priority**     **Feature**

  US-07    As a midwife, I want to register  Must Have        Auth / RBAC
           as a healthcare provider so that                   
           I can access patient monitoring                    
           tools.                                             

  US-08    As a midwife, I want to view a    Must Have        Provider
           list of my assigned patients and                   Dashboard
           their latest risk levels so that                   
           I can prioritise who needs urgent                  
           attention.                                         

  US-09    As a midwife, I want to view the  Must Have        Patient Records
           full prediction history of any                     
           patient so that I can track their                  
           health progression.                                

  US-10    As a midwife, I want to add       Should Have      Patient Records
           clinical notes to a patient\'s                     
           record so that I can document my                   
           observations.                                      
  -------- --------------------------------- ---------------- ----------------

**5. System Architecture**

**5.1 Architecture Overview**

MamaCare AI follows a three-tier client-server architecture with AI
services abstracted through a backend API layer. This ensures the
frontend remains lightweight and the AI logic is centralised and secure.

**\[ React Frontend \] ──── HTTP/REST ──── \[ FastAPI Backend \] ──── \[
MongoDB Atlas \]**

\|

\[ Firebase Auth \] \[ Firebase Storage \] \[ Gemini API \]

**5.2 Technology Stack**

  -------------------- ---------------------- ---------------------------------
  **Layer**            **Technology**         **Purpose**

  **Frontend**         React.js + Tailwind    Responsive web UI,
                       CSS                    component-based architecture

  **Backend**          FastAPI (Python)       REST API server, business logic,
                                              AI orchestration

  **Database**         MongoDB Atlas (Free    Flexible document storage for
                       Tier)                  health records

  **Authentication**   Firebase Auth          Secure user login, role
                                              management, JWT tokens

  **File Storage**     Firebase Storage       Medical report file uploads (PDF,
                                              image)

  **AI Engine**        Google Gemini API      Risk analysis, report
                       (Free Tier)            summarisation, voice Q&A,
                                              translation

  **Voice (STT)**      Web Speech API         Convert spoken user input to text
                       (Browser)              (no API cost)

  **Voice (TTS)**      Web Speech API /       Read AI responses back to user in
                       ResponsiveVoice        their language

  **Frontend Host**    Vercel (Free Tier)     Global CDN deployment for React
                                              app

  **Backend Host**     Render (Free Tier)     FastAPI server hosting with
                                              auto-deploy
  -------------------- ---------------------- ---------------------------------

**5.3 Data Flow --- Risk Prediction**

1.  Patient fills in health data form on the React frontend

2.  Frontend sends POST request to FastAPI backend with form data

3.  Backend validates and sanitises all input data

4.  Backend applies rule-based scoring to flag critical thresholds
    (e.g., blood pressure \> 140/90)

5.  Backend sends structured health data to Gemini API with a clinical
    risk assessment prompt

6.  Gemini returns a risk level (Low / Moderate / High / Critical) with
    reasoning and recommendations

7.  Backend saves prediction result to MongoDB Atlas under the
    patient\'s profile

8.  Backend returns the risk result and recommendations to the frontend

9.  Frontend displays the risk assessment on the patient\'s dashboard

**5.4 Data Flow --- Medical Report Interpretation**

10. Patient uploads a PDF or image file through the React frontend

11. Frontend sends the file directly to Firebase Storage and retrieves a
    download URL

12. Frontend sends the download URL to the FastAPI backend

13. Backend downloads the file from Firebase Storage

14. Backend extracts text from the document using PyMuPDF (PDF) or
    pytesseract (image OCR)

15. Backend sends extracted text to Gemini API with a medical
    simplification prompt, specifying the patient\'s preferred language

16. Gemini returns a simplified summary in the requested language

17. Backend saves the report metadata and summary to MongoDB

18. Frontend displays the simplified summary to the patient

**6. Detailed Functional Requirements**

**FR-01: User Registration & Authentication**

**Description**

All users (patients and healthcare providers) must register and log in
securely before accessing any protected feature of the platform.

**Functional Details**

-   Registration form collects: full name, email address, password, role
    (Patient or Healthcare Provider), preferred language

-   For Healthcare Providers: additional fields for medical licence
    number and affiliated facility name

-   Firebase Auth handles credential storage and JWT token issuance

-   On successful login, backend verifies Firebase token and returns
    user profile with role information

-   Role-based access control (RBAC) restricts provider-only endpoints
    from patient accounts

-   Password reset flow via Firebase\'s built-in email verification

**Acceptance Criteria**

-   User can register with valid email and password

-   Duplicate email registrations are rejected with a clear error
    message

-   JWT token expires after 24 hours and prompts re-authentication

-   Patient accounts cannot access healthcare provider routes

**FR-02: Patient Health Profile**

**Description**

Each patient maintains a persistent health profile that stores personal
and pregnancy-related baseline information used to personalise risk
assessments.

**Profile Fields**

-   Personal: full name, date of birth, state/LGA of residence, phone
    number

-   Pregnancy: gestational age (weeks), estimated due date, number of
    previous pregnancies, number of previous live births

-   Medical History: pre-existing conditions (diabetes, hypertension,
    heart disease, sickle cell), allergies, current medications

-   Preferred language for AI responses (English, Yoruba, Igbo, Hausa)

-   Assigned healthcare provider (optional --- patient can link to a
    midwife by provider code)

**Acceptance Criteria**

-   Patient can create and update their profile at any time

-   Profile data is stored securely in MongoDB and associated with the
    Firebase UID

-   Risk predictions automatically incorporate profile baseline data

**FR-03: Maternal Risk Prediction**

**Description**

The core clinical feature of MamaCare AI. Patients submit current health
readings and the system predicts their risk level for major maternal
health conditions.

**Input Data Collected Per Assessment**

  --------------------- ------------------------ ------------------------
  **Input Field**       **Type**                 **Clinical
                                                 Significance**

  Systolic Blood        Number (mmHg)            Preeclampsia,
  Pressure                                       hypertension detection

  Diastolic Blood       Number (mmHg)            Preeclampsia,
  Pressure                                       hypertension detection

  Blood Glucose Level   Number (mg/dL)           Gestational diabetes
                                                 detection

  Body Temperature      Number (°C)              Infection, sepsis
                                                 indicator

  Heart Rate            Number (bpm)             Cardiovascular stress
                                                 indicator

  Haemoglobin Level     Number (g/dL)            Anaemia detection

  Current Symptoms      Multi-select checklist   Holistic risk picture

  Weeks Pregnant        Number                   Gestational context for
  (current)                                      thresholds
  --------------------- ------------------------ ------------------------

**Symptom Checklist Options**

-   Severe headache

-   Blurred or double vision

-   Swelling of hands, face, or feet

-   Reduced or no fetal movement

-   Vaginal bleeding

-   Severe abdominal pain

-   Difficulty breathing

-   Fever or chills

-   Nausea and vomiting

-   Dizziness or fainting

**Risk Output**

-   Risk Level: Low (green) \| Moderate (yellow) \| High (orange) \|
    Critical (red)

-   Conditions Flagged: e.g., Preeclampsia Risk --- High, Anaemia Risk
    --- Moderate

-   Plain Language Explanation: what the readings mean in simple terms

-   Recommended Actions: e.g., \'Visit a clinic within 24 hours\',
    \'Increase iron-rich foods\', \'Call emergency services
    immediately\'

-   Language: all output generated in the patient\'s preferred language

**Acceptance Criteria**

-   System returns a risk result within 10 seconds of submission

-   All critical-risk results display an emergency action message

-   Result is saved to the patient\'s prediction history in MongoDB

-   If any single symptom is \'vaginal bleeding\' or \'severe abdominal
    pain\', risk level is automatically elevated to at least High

**FR-04: Medical Report Interpreter**

**Description**

Patients can upload lab results, scan reports, or any medical document
and receive a simplified, plain-language explanation in their preferred
language.

**Supported File Types**

-   PDF documents

-   Images: JPEG, PNG (e.g., photos of printed lab reports)

-   Maximum file size: 10 MB

**Processing Steps (Backend)**

19. File received from Firebase Storage URL

20. File type detection and validation

21. Text extraction: PyMuPDF for PDFs, pytesseract for images

22. Extracted text sent to Gemini with prompt: \'You are a maternal
    health assistant. Explain this medical report to a pregnant patient
    in simple terms. Use \[LANGUAGE\]. Highlight any abnormal values and
    what they mean. Tell the patient what action to take.\'

23. Response returned to patient on the frontend

**Acceptance Criteria**

-   Supported files are processed and explained within 30 seconds

-   Unsupported file types are rejected with a friendly error message

-   The simplified explanation is displayed alongside the original file
    preview

-   Report metadata (filename, date, summary snippet) is saved to
    patient\'s record

**FR-05: Multilingual Voice Assistant**

**Description**

A conversational voice interface that allows patients to ask maternal
health questions by speaking in their language and receive spoken
responses.

**Supported Languages**

-   English

-   Yoruba

-   Igbo

-   Hausa

**Technical Implementation**

-   Speech-to-Text: Browser Web Speech API captures and transcribes user
    voice input (no API cost, works in Chrome and Safari)

-   Language Selection: Patient selects their language before starting
    the session; the STT engine is configured accordingly

-   NLP & Response: Transcribed text is sent to FastAPI backend, which
    sends it to Gemini API with a prompt specifying the language and
    maternal health context

-   Text-to-Speech: The AI response is read back to the user using the
    Web Speech API\'s speech synthesis (or ResponsiveVoice as fallback
    for Yoruba/Igbo/Hausa)

**Conversation Scope**

The voice assistant is scoped to maternal health topics only. The Gemini
system prompt restricts responses to pregnancy, nutrition, symptoms,
medications, and clinic advice. Off-topic questions are redirected
politely.

**Acceptance Criteria**

-   Voice recording starts and stops cleanly via a button press

-   Transcribed text is visible to the user before the AI responds

-   AI response is delivered in the same language the patient spoke

-   Sessions are not saved to the database (privacy --- conversations
    are ephemeral)

**FR-06: Patient Dashboard**

**Description**

A centralised view for the patient that shows their health profile,
prediction history, uploaded reports, and a summary of their current
risk status.

**Dashboard Components**

-   Current Risk Status Card --- shows the result of the most recent
    prediction with colour-coded risk level

-   Prediction History Timeline --- chronological list of all past
    predictions with date, risk level, and key readings

-   Reports Library --- list of uploaded medical reports with date and
    AI-generated summary snippet

-   Quick Actions --- buttons to Start New Assessment, Upload Report, or
    Open Voice Assistant

-   Profile Summary --- name, gestational age, due date, assigned
    provider

**Acceptance Criteria**

-   Dashboard loads within 3 seconds of login

-   Prediction history shows most recent 10 entries by default with a
    \'Load More\' option

-   All entries link to their full detailed view

**FR-07: Healthcare Provider Dashboard**

**Description**

A separate dashboard for midwives and doctors to monitor their assigned
patients, view risk alerts, and add clinical notes.

**Dashboard Components**

-   Patient List --- table of all assigned patients sorted by risk level
    (critical first)

-   Risk Alert Panel --- highlights patients whose risk level changed
    since last check

-   Patient Detail View --- full prediction history, uploaded reports,
    and profile for a selected patient

-   Clinical Notes --- provider can add, edit, and delete notes on any
    patient record

-   Patient Assignment --- provider shares their unique Provider Code
    with patients to link accounts

**Acceptance Criteria**

-   Provider can see all patients who linked their account using the
    provider\'s code

-   Risk alert panel refreshes on page load

-   Clinical notes are timestamped and attributed to the provider

-   Providers cannot edit or delete patient health data --- read-only
    access to patient records

**7. Non-Functional Requirements**

  ------------ ------------------ ----------------------------------------
  **ID**       **Category**       **Requirement**

  NFR-01       Performance        Risk prediction API response must
                                  complete in under 10 seconds under
                                  normal load

  NFR-02       Performance        Report upload and processing must
                                  complete in under 30 seconds for files
                                  under 5MB

  NFR-03       Performance        Dashboard must load within 3 seconds on
                                  a standard 4G mobile connection

  NFR-04       Security           All API endpoints (except auth) must
                                  validate Firebase JWT tokens

  NFR-05       Security           All data in transit must use HTTPS/TLS
                                  encryption

  NFR-06       Security           MongoDB Atlas connection must use TLS
                                  and IP allowlisting

  NFR-07       Security           Firebase Storage files must be
                                  access-controlled --- patients can only
                                  read their own files

  NFR-08       Usability          All UI screens must be fully responsive
                                  from 320px (small mobile) to 1440px
                                  (desktop)

  NFR-09       Usability          Error messages must be written in plain
                                  language, not technical jargon

  NFR-10       Reliability        The system must handle Gemini API
                                  failures gracefully with a user-friendly
                                  fallback message

  NFR-11       Scalability        Backend architecture must support
                                  horizontal scaling when moved to paid
                                  hosting

  NFR-12       Accessibility      All buttons and interactive elements
                                  must meet WCAG 2.1 AA contrast ratios
  ------------ ------------------ ----------------------------------------

**8. Database Schema (MongoDB)**

MamaCare AI uses MongoDB Atlas with the following collections. All
documents include auto-generated \_id fields by MongoDB.

**8.1 Collection: users**

*Stores all user account data for both patients and healthcare
providers.*

> { firebase_uid: string (unique), full_name: string, email: string,
> role: \"patient\" \| \"provider\", preferred_language: \"en\" \|
> \"yo\" \| \"ig\" \| \"ha\", phone_number: string, created_at:
> datetime, updated_at: datetime, // Provider-only fields
> licence_number: string, facility_name: string, provider_code: string
> (unique, 6-char) }

**8.2 Collection: patient_profiles**

> { firebase_uid: string (ref: users), date_of_birth: date,
> state_of_residence: string, lga: string, gestational_age_weeks:
> number, estimated_due_date: date, previous_pregnancies: number,
> previous_live_births: number, pre_existing_conditions: \[string\],
> allergies: \[string\], current_medications: \[string\],
> assigned_provider_code: string \| null, updated_at: datetime }

**8.3 Collection: risk_predictions**

> { firebase_uid: string (ref: users), created_at: datetime, input_data:
> { systolic_bp: number, diastolic_bp: number, blood_glucose: number,
> temperature: number, heart_rate: number, haemoglobin: number,
> symptoms: \[string\], gestational_week: number }, risk_level: \"low\"
> \| \"moderate\" \| \"high\" \| \"critical\", conditions_flagged:
> \[string\], explanation: string, recommendations: \[string\],
> language_used: string }

**8.4 Collection: medical_reports**

> { firebase_uid: string (ref: users), created_at: datetime, file_name:
> string, firebase_storage_url: string, file_type: \"pdf\" \| \"image\",
> extracted_text: string, simplified_summary: string, language_used:
> string }

**8.5 Collection: provider_notes**

> { provider_uid: string (ref: users), patient_uid: string (ref: users),
> note_text: string, created_at: datetime, updated_at: datetime }

**9. API Endpoints Reference**

All endpoints (except /auth/\*) require a valid Firebase JWT token in
the Authorization header: Authorization: Bearer \<token\>

**9.1 Authentication**

  ------------ -------------------- ------------ ----------------------------------
  **Method**   **Endpoint**         **Auth       **Description**
                                    Required**   

  POST         /auth/register       No           Register new user (patient or
                                                 provider)

  POST         /auth/verify-token   No           Verify Firebase token and return
                                                 user profile
  ------------ -------------------- ------------ ----------------------------------

**9.2 Patient Profile**

  ------------ ------------------ ------------ -------------------------------
  **Method**   **Endpoint**       **Auth       **Description**
                                  Required**   

  GET          /profile/me        Yes          Retrieve current patient
                                  (Patient)    profile

  PUT          /profile/me        Yes          Create or update patient health
                                  (Patient)    profile
  ------------ ------------------ ------------ -------------------------------

**9.3 Risk Prediction**

  ------------ ---------------------- ------------ ----------------------------
  **Method**   **Endpoint**           **Auth       **Description**
                                      Required**   

  POST         /predictions/assess    Yes          Submit health data and
                                      (Patient)    receive risk assessment

  GET          /predictions/history   Yes          Get paginated list of
                                      (Patient)    patient\'s past predictions

  GET          /predictions/{id}      Yes          Get full detail of a
                                      (Patient)    specific prediction
  ------------ ---------------------- ------------ ----------------------------

**9.4 Medical Reports**

  ------------ --------------------- ------------ ----------------------------
  **Method**   **Endpoint**          **Auth       **Description**
                                     Required**   

  POST         /reports/interpret    Yes          Send Firebase Storage URL
                                     (Patient)    for AI interpretation

  GET          /reports/history      Yes          Get all uploaded reports for
                                     (Patient)    the patient
  ------------ --------------------- ------------ ----------------------------

**9.5 Voice Assistant**

  ------------ --------------------- ------------ ----------------------------
  **Method**   **Endpoint**          **Auth       **Description**
                                     Required**   

  POST         /assistant/ask        Yes          Send transcribed question
                                     (Patient)    and language; receive AI
                                                  answer
  ------------ --------------------- ------------ ----------------------------

**9.6 Healthcare Provider**

  ------------ ---------------------------------- ------------ -------------------------
  **Method**   **Endpoint**                       **Auth       **Description**
                                                  Required**   

  GET          /provider/patients                 Yes          Get all patients assigned
                                                  (Provider)   to this provider

  GET          /provider/patients/{uid}/history   Yes          Get full prediction
                                                  (Provider)   history of a patient

  POST         /provider/patients/{uid}/notes     Yes          Add a clinical note to a
                                                  (Provider)   patient record

  GET          /provider/patients/{uid}/notes     Yes          Retrieve all clinical
                                                  (Provider)   notes for a patient
  ------------ ---------------------------------- ------------ -------------------------

**10. UI/UX Page Descriptions**

This section describes each screen the Frontend Developer will build.
All pages must be responsive (mobile-first) and use the MamaCare AI
design system: primary colour #C0392B (deep red), background #FFF5F5
(light blush), white cards with soft shadows.

**Page 1: Landing / Home Page**

-   Hero section with MamaCare AI name, tagline: \'Your Pregnancy Health
    Companion\', and two CTAs: \'Get Started\' and \'For Healthcare
    Providers\'

-   Features overview: 3 cards showing Risk Prediction, Report
    Interpreter, Voice Assistant

-   Supported languages badge row: EN \| YO \| IG \| HA

-   Simple footer with team name

**Page 2: Registration Page**

-   Role selector at the top: \'I am a Pregnant Patient\' or \'I am a
    Healthcare Provider\' (switches form fields)

-   Patient form: name, email, password, preferred language dropdown

-   Provider form: name, email, password, licence number, facility name

-   Firebase Auth handles the actual account creation

-   Link to Login page

**Page 3: Login Page**

-   Email and password fields

-   \'Forgot Password\' link (triggers Firebase password reset email)

-   Link to Registration

**Page 4: Onboarding / Profile Setup (Patient)**

-   Multi-step form (3 steps): Step 1 --- Personal Details, Step 2 ---
    Pregnancy Details, Step 3 --- Medical History

-   Progress indicator at the top

-   Each step validates before allowing the user to proceed

-   Final step includes optional field to enter provider code to link to
    a midwife

**Page 5: Patient Dashboard (Home)**

-   Top bar: patient name, gestational week, due date countdown

-   Current Risk Status Card (large, colour-coded): Low / Moderate /
    High / Critical

-   Quick Action buttons: New Assessment, Upload Report, Voice Assistant

-   Recent Predictions list (last 5, each showing date, risk level chip,
    key reading)

-   Recent Reports list (last 3, each showing filename and summary
    snippet)

**Page 6: Risk Assessment Form**

-   Clean form with labelled input fields for all health readings (see
    FR-03)

-   Symptom checklist with visible checkboxes

-   \'Get My Risk Assessment\' submit button (shows loading spinner
    while API call is in progress)

-   On result: displays Risk Level badge, conditions flagged,
    explanation paragraph, and recommendations list

-   \'Save to History\' is automatic; a \'View My Dashboard\' button
    appears after result

**Page 7: Report Upload & Interpreter**

-   Drag-and-drop file upload area (also supports click to browse)

-   File type and size validation with friendly error messages

-   Upload progress bar (Firebase Storage upload)

-   After upload: file preview panel (PDF viewer or image) on the left,
    AI summary panel on the right

-   Language selector at the top of the summary panel to re-generate in
    a different language

**Page 8: Voice Assistant**

-   Large microphone button (centre of screen) --- press and hold to
    record

-   Language selector prominently at the top

-   Waveform animation during recording

-   Transcription box: shows what was heard before sending

-   AI response displayed as text below, with a speaker icon to read it
    aloud

-   Chat-style history of the current session (cleared on page reload
    --- not persisted)

**Page 9: Provider Dashboard**

-   Patient table: Name \| Gestational Week \| Last Risk Level \| Last
    Assessment Date \| Actions

-   Risk level column uses colour-coded chips (red = critical, orange =
    high, yellow = moderate, green = low)

-   Click any patient row to open Patient Detail View

-   Alert banner at top if any patient has a Critical risk level

**Page 10: Patient Detail View (Provider)**

-   Patient profile summary card at top

-   Full prediction history timeline

-   Reports list (view-only)

-   Clinical Notes section: list of past notes + \'Add Note\' text area

**11. Team Task Assignment**

**11.1 Frontend Developer Tasks**

  -------- ---------------------------------- ---------------- ---------------
  **\#**   **Task**                           **Feature**      **Priority**

  1        Set up React project with Tailwind Setup            Day 1
           CSS and React Router                                

  2        Build Landing Page with feature    Landing          Day 1
           highlights                                          

  3        Build Registration and Login pages Auth             Day 1
           with Firebase Auth SDK                              

  4        Build multi-step onboarding form   Profile          Day 2
           for patient profile                                 

  5        Build Patient Dashboard with risk  Dashboard        Day 2
           status card and history list                        

  6        Build Risk Assessment Form with    Risk Prediction  Day 3
           all input fields and symptom                        
           checklist                                           

  7        Build Risk Result display          Risk Prediction  Day 3
           component (risk badge, conditions,                  
           recommendations)                                    

  8        Build Report Upload page with      Reports          Day 4
           Firebase Storage upload and                         
           progress bar                                        

  9        Build split-panel Report           Reports          Day 4
           Interpreter page (file preview +                    
           AI summary)                                         

  10       Build Voice Assistant page with    Voice            Day 5
           Web Speech API integration                          

  11       Build Provider Dashboard with      Provider         Day 5
           patient table and alert banner                      

  12       Build Patient Detail View for      Provider         Day 6
           providers (history + notes)                         

  13       Final UI polish, loading states,   QA               Day 7
           error messages, responsive testing                  
  -------- ---------------------------------- ---------------- ---------------

**11.2 Backend Developer Tasks**

  -------- ---------------------------------- ---------------- ---------------
  **\#**   **Task**                           **Feature**      **Priority**

  1        Set up FastAPI project structure   Setup            Day 1
           with environment config and CORS                    

  2        Connect MongoDB Atlas and define   Database         Day 1
           Pydantic models for all                             
           collections                                         

  3        Set up Firebase Admin SDK for      Auth             Day 1
           server-side JWT token verification                  

  4        Build /auth/register and           Auth             Day 1
           /auth/verify-token endpoints                        

  5        Build RBAC middleware (patient vs. Auth             Day 2
           provider route guards)                              

  6        Build /profile/me GET and PUT      Profile          Day 2
           endpoints                                           

  7        Build Gemini API integration       AI Core          Day 2
           service (reusable prompt wrapper)                   

  8        Build rule-based risk scoring      Risk Prediction  Day 3
           logic (threshold checks before                      
           Gemini call)                                        

  9        Build /predictions/assess endpoint Risk Prediction  Day 3
           with Gemini integration and                         
           MongoDB save                                        

  10       Build /predictions/history and     Risk Prediction  Day 3
           /predictions/{id} endpoints                         

  11       Build PDF text extraction          Reports          Day 4
           (PyMuPDF) and image OCR                             
           (pytesseract) service                               

  12       Build /reports/interpret endpoint  Reports          Day 4
           with file download, extraction,                     
           and Gemini call                                     

  13       Build /assistant/ask endpoint with Voice            Day 5
           language-aware Gemini prompt                        

  14       Build all /provider/\* endpoints   Provider         Day 5-6
           (patient list, history, notes)                      

  15       Deploy FastAPI to Render,          DevOps           Day 6
           configure environment variables                     
           and CORS                                            

  16       End-to-end API testing, error      QA               Day 7
           handling, and documentation                         
  -------- ---------------------------------- ---------------- ---------------

**12. One-Week Development Timeline**

  --------- ------------------------------ ------------------------------
  **Day**   **Frontend Developer**         **Backend Developer**

  **Day 1** Project setup, Landing Page,   FastAPI setup, MongoDB
            Registration & Login UI        connection, Firebase Admin,
                                           Auth endpoints

  **Day 2** Onboarding form, Patient       RBAC middleware, Profile
            Dashboard skeleton             endpoints, Gemini API wrapper

  **Day 3** Risk Assessment form + result  Risk scoring logic, Prediction
            display component              endpoints, MongoDB saves

  **Day 4** Report Upload page + Firebase  PDF/OCR extraction service,
            Storage integration            Report interpret endpoint

  **Day 5** Voice Assistant page (Web      Voice assistant endpoint,
            Speech API)                    Provider dashboard endpoints

  **Day 6** Provider Dashboard + Patient   Deploy to Render, environment
            Detail View                    config, CORS setup

  **Day 7** Final polish, responsive       End-to-end testing, bug fixes,
            fixes, error states, deploy to API documentation
            Vercel                         
  --------- ------------------------------ ------------------------------

**13. Risks & Mitigations**

  --------------------- ---------------- ---------------------------------------
  **Risk**              **Likelihood**   **Mitigation**

  Gemini API rate limit Medium           Implement response caching for repeated
  exceeded during demo                   similar requests; add exponential
  or testing                             backoff retry logic

  Web Speech API not    Low              Test on Chrome (full support) and
  supported in all                       Safari. Display text input fallback for
  browsers                               unsupported browsers

  Hausa/Igbo/Yoruba STT Medium           Allow users to see and edit the
  accuracy is poor                       transcription before sending to AI;
                                         text input always available as fallback

  Render free tier      High             Add a keep-alive ping from the frontend
  server cold starts                     on app load; display \'Loading
  (30--60s delay)                        server\...\' message to user

  MongoDB Atlas free    Low              Store only metadata and text in
  tier 512MB storage                     MongoDB; all files stay in Firebase
  limit                                  Storage which has 5GB free

  OCR quality poor for  Medium           Prompt Gemini to handle ambiguous text
  handwritten or                         gracefully; display a message asking
  low-resolution                         user to upload a clearer image if
  reports                                extraction fails

  Time pressure --- not Medium           Core MVP priority order: Auth \> Risk
  all features                           Prediction \> Report Interpreter \>
  completed by deadline                  Voice Assistant \> Provider Dashboard.
                                         Cut provider features last if needed
  --------------------- ---------------- ---------------------------------------

**14. Gemini API Prompt Templates**

These are the exact prompt templates the Backend Developer should
implement. Store these as constants in a prompts.py file.

**14.1 Risk Assessment Prompt**

> SYSTEM: You are a maternal health risk assessment AI. Analyse the
> provided health data and return a JSON response only. No markdown, no
> explanation outside the JSON. USER: Assess the maternal health risk
> for a pregnant patient. Patient Data: {health_data_json} Language for
> response: {language} Return JSON: { \"risk_level\":
> \"low\|moderate\|high\|critical\", \"conditions_flagged\":
> \[\"condition1\", \"condition2\"\], \"explanation\": \"plain language
> explanation in {language}\", \"recommendations\": \[\"action1\",
> \"action2\", \"action3\"\] }

**14.2 Report Interpretation Prompt**

> SYSTEM: You are a maternal health assistant helping a pregnant patient
> understand her medical report. Use simple, compassionate language.
> Respond only in {language}. USER: Please explain this medical report
> to me in simple terms: {extracted_text} Tell me: 1. What the key
> values mean 2. Which values (if any) are abnormal 3. What I should do
> next

**14.3 Voice Assistant Prompt**

> SYSTEM: You are MamaCare, a friendly maternal health assistant. Only
> answer questions related to pregnancy, maternal health, nutrition,
> symptoms, and when to see a doctor. If asked off-topic questions,
> politely redirect to maternal health. Always respond in {language}.
> Keep responses under 150 words. USER: {transcribed_question}

**15. Environment Variables Reference**

**15.1 Backend (.env)**

> MONGODB_URI=mongodb+srv://\<user\>:\<pass\>@cluster.mongodb.net/mamacare
> MONGODB_DB_NAME=mamacare_db GEMINI_API_KEY=\<your_gemini_api_key\>
> FIREBASE_SERVICE_ACCOUNT_JSON=\<path_to_firebase_admin_sdk_json\>
> FIREBASE_STORAGE_BUCKET=\<your_project\>.appspot.com
> ALLOWED_ORIGINS=https://mamacare.vercel.app,http://localhost:3000

**15.2 Frontend (.env)**

> REACT_APP_API_BASE_URL=https://mamacare-api.onrender.com
> REACT_APP_FIREBASE_API_KEY=\<firebase_web_api_key\>
> REACT_APP_FIREBASE_AUTH_DOMAIN=\<project\>.firebaseapp.com
> REACT_APP_FIREBASE_PROJECT_ID=\<project_id\>
> REACT_APP_FIREBASE_STORAGE_BUCKET=\<project\>.appspot.com
> REACT_APP_FIREBASE_APP_ID=\<app_id\>

**16. Glossary**

  ------------------ ----------------------------------------------------
  **Term**           **Definition**

  **Preeclampsia**   A serious pregnancy complication characterised by
                     high blood pressure and signs of damage to other
                     organ systems, typically occurring after 20 weeks of
                     pregnancy

  **Gestational      A type of diabetes that develops during pregnancy in
  Diabetes**         women who did not previously have diabetes, caused
                     by hormonal changes affecting insulin function

  **Anaemia**        A condition where there are not enough healthy red
                     blood cells to carry adequate oxygen to body
                     tissues; detected via haemoglobin levels below 11
                     g/dL in pregnancy

  **JWT**            JSON Web Token --- a secure, compact token used to
                     transmit authentication information between frontend
                     and backend

  **RBAC**           Role-Based Access Control --- a system that
                     restricts access to resources based on the user\'s
                     role (patient vs. provider)

  **STT**            Speech-to-Text --- technology that converts spoken
                     audio into written text

  **TTS**            Text-to-Speech --- technology that converts written
                     text into spoken audio

  **OCR**            Optical Character Recognition --- technology that
                     extracts text from images or scanned documents

  **Gemini API**     Google\'s large language model API used for natural
                     language processing, including risk analysis, report
                     simplification, and multilingual responses

  **FastAPI**        A modern, high-performance Python web framework for
                     building APIs, used as the MamaCare backend server

  **Firebase Auth**  Google Firebase\'s authentication service used for
                     secure user login, registration, and token
                     management

  **MongoDB Atlas**  A cloud-hosted MongoDB database service used to
                     store all MamaCare application data
  ------------------ ----------------------------------------------------

*End of MamaCare AI Software Requirements Specification*

Prepared by Indubitable Team \| Version 1.0 \| June 2026
