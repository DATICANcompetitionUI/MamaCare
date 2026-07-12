"use client";

import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getReportDetail, ReportInterpretation } from "@/lib/dashboard-data";
import { 
  HeartPulse, 
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Volume2,
  VolumeX,
  Loader2
} from "lucide-react";

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [result, setResult] = useState<(ReportInterpretation & { filename: string, date: string }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setIsLoading(true);
          const token = await user.getIdToken();
          const data = await getReportDetail(token, id);
          setResult(data);
        } catch (error) {
          console.error("Error fetching detail:", error);
          alert("Failed to load report details.");
          router.push("/dashboard/reports");
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [id, router]);

  const toggleSpeech = async () => {
    if (isSpeaking || isLoadingAudio) {
      stopSpeaking();
      return;
    }

    if (!result) return;
    setIsLoadingAudio(true);

    const textToRead = `
      Summary: ${result.summary}. 
      ${result.abnormalValues && result.abnormalValues.length > 0 ? "Abnormal findings: " + result.abnormalValues.map(v => v.finding + ". " + v.meaning).join(" ") : ""}
      Recommendations: ${result.recommendations.join(". ")}
    `;

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToRead, language: "en" })
      });

      if (!res.ok) throw new Error("TTS generation failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
      };

      await audio.play();
      setIsSpeaking(true);
    } catch (error) {
      console.error(error);
      alert("Failed to generate speech audio.");
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
    setIsLoadingAudio(false);
  };

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
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1A1A1A", margin: "0 0 0.5rem 0" }}>Loading Report...</h2>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <Link href="/dashboard/reports" style={{
          display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px",
          backgroundColor: "#FFFFFF", border: "1px solid #F0D9D9", borderRadius: "0.5rem", color: "#1A1A1A"
        }}>
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A1A1A", margin: 0 }}>Report Details</h1>
          <p style={{ fontSize: "0.9375rem", color: "#6B7280", margin: "0.25rem 0 0 0" }}>{result.filename} • {new Date(result.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0D9D9", borderRadius: "1rem", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        <button 
          onClick={toggleSpeech}
          disabled={isLoadingAudio}
          style={{
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: isSpeaking ? "#FDECEA" : (isLoadingAudio ? "#E5E7EB" : "#F3F4F6"),
            color: isSpeaking ? "#C0392B" : (isLoadingAudio ? "#9CA3AF" : "#4B5563"),
            border: "none",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: isLoadingAudio ? "not-allowed" : "pointer",
            transition: "all 0.2s ease"
          }}
        >
          {isLoadingAudio ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isSpeaking ? (
            <VolumeX size={16} />
          ) : (
            <Volume2 size={16} />
          )}
          {isLoadingAudio ? "Generating Voice..." : isSpeaking ? "Stop Reading" : "Read Aloud"}
        </button>

        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A1A", margin: "0 0 0.5rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            📋 What This Report Shows
          </h3>
          <p style={{ fontSize: "0.9375rem", color: "#4B5563", margin: 0, lineHeight: 1.6 }}>
            {result.summary}
          </p>
        </div>

        {result.abnormalValues && result.abnormalValues.length > 0 && (
          <div style={{ backgroundColor: "#FFF5F5", padding: "1rem", borderRadius: "0.75rem", border: "1px solid #F0D9D9" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#991B1B", margin: "0 0 0.75rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <AlertCircle size={18} /> Values That Need Attention
            </h3>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {result.abnormalValues.map((av, i) => (
                <li key={i} style={{ fontSize: "0.9375rem", color: "#1A1A1A" }}>
                  <strong>{av.finding}:</strong> {av.meaning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.recommendations && result.recommendations.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A1A", margin: "0 0 0.75rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle2 size={18} color="#16A34A" /> What To Do Next
            </h3>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", color: "#4B5563" }}>
              {result.recommendations.map((rec, i) => (
                <li key={i} style={{ fontSize: "0.9375rem", lineHeight: 1.5 }}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
