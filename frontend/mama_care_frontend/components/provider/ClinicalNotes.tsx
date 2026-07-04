"use client";

import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Send, FileSignature, Trash2 } from "lucide-react";

/**
 * components/provider/ClinicalNotes.tsx
 *
 * Interactive note-taking component for providers.
 * Uses localStorage to persist notes for the demo simulation.
 */

interface ClinicalNote {
  id: string;
  patientId: string;
  text: string;
  timestamp: string; // ISO string
  providerName: string;
}

export default function ClinicalNotes({ patientId, providerName }: { patientId: string; providerName: string }) {
  const [notes, setNotes] = useState<ClinicalNote[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const storageKey = `mamacare_notes_${patientId}`;

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    }
  }, [notes, isLoaded, storageKey]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: ClinicalNote = {
      id: "note-" + Date.now(),
      patientId,
      text: newNoteText.trim(),
      timestamp: new Date().toISOString(),
      providerName,
    };

    // Add to top of list
    setNotes([newNote, ...notes]);
    setNewNoteText("");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Prevent hydration mismatch by not rendering until loaded
  if (!isLoaded) return <div className="animate-pulse h-40 bg-gray-100 rounded-xl"></div>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full max-h-[600px]">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2 bg-gray-50">
        <FileSignature className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900">Clinical Notes</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No clinical notes added yet.</p>
            <p className="text-sm mt-1">Notes you add here are saved locally for this patient.</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm relative group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-900 text-sm">{note.providerName}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400" title={format(new Date(note.timestamp), "PPpp")}>
                    {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
                  </span>
                  <button 
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{note.text}</p>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleAddNote} className="relative">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Type a clinical note..."
            className="w-full min-h-[100px] p-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm text-gray-900"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddNote(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!newNoteText.trim()}
            className="absolute bottom-3 right-3 p-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-gray-400 text-right mt-1">Press Enter to save, Shift+Enter for new line</p>
      </div>
    </div>
  );
}
