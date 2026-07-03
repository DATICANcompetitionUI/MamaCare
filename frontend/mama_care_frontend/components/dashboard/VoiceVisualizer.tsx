"use client";

import { useEffect, useState } from "react";

/**
 * components/dashboard/VoiceVisualizer.tsx
 *
 * A purely visual component that shows animated pulsating rings
 * to indicate when the microphone is listening or the AI is speaking.
 */

interface VoiceVisualizerProps {
  status: "idle" | "listening" | "processing" | "speaking";
}

export default function VoiceVisualizer({ status }: VoiceVisualizerProps) {
  // If we are idle, don't show the visualizer rings
  if (status === "idle") {
    return null;
  }

  // Determine colour based on state:
  // Listening = Primary Red (#C0392B)
  // Processing = Yellow/Orange (#CA8A04)
  // Speaking = Green (#16A34A)
  const getColourClass = () => {
    switch (status) {
      case "listening":
        return "bg-primary/20";
      case "processing":
        return "bg-yellow-500/20";
      case "speaking":
        return "bg-green-500/20";
      default:
        return "bg-primary/20";
    }
  };

  const getBorderColourClass = () => {
    switch (status) {
      case "listening":
        return "border-primary/40";
      case "processing":
        return "border-yellow-500/40";
      case "speaking":
        return "border-green-500/40";
      default:
        return "border-primary/40";
    }
  };

  const colour = getColourClass();
  const border = getBorderColourClass();

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className={`absolute w-32 h-32 rounded-full border ${border} ${colour} animate-ping`} style={{ animationDuration: '2s' }} />
      <div className={`absolute w-40 h-40 rounded-full border ${border} ${colour} animate-ping`} style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
      <div className={`absolute w-48 h-48 rounded-full border ${border} ${colour} animate-ping`} style={{ animationDuration: '3s', animationDelay: '1s' }} />
    </div>
  );
}
