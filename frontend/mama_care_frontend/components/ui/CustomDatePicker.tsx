import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (val: string) => void;
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CustomDatePicker({ 
  value, 
  onChange, 
  placeholder = "Select a date", 
  minYear = 1950, 
  maxYear = 2030 
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse initial value or use current date
  const initialDate = value ? new Date(value) : new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [view, setView] = useState<"days" | "years">("days");

  const containerRef = useRef<HTMLDivElement>(null);
  const yearsContainerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setView("days");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update calendar when value prop changes from outside (e.g. auto-calculation)
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentMonth(d.getMonth());
        setCurrentYear(d.getFullYear());
      }
    }
  }, [value]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    // Preserve local timezone offsets by padding safely
    const yyyy = currentYear;
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  // Generate year list based on constraints
  const years = [];
  for (let y = minYear; y <= maxYear; y++) {
    years.push(y);
  }

  // Scroll to active year when switching to year view
  useEffect(() => {
    if (view === "years" && yearsContainerRef.current) {
      const activeBtn = yearsContainerRef.current.querySelector('button[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  }, [view]);

  // Formatting display value locally for the user's view
  let displayValue = "";
  if (value) {
    const [y, m, d] = value.split('-');
    if (y && m && d) {
      const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      displayValue = dateObj.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%", padding: "1rem", borderRadius: "0.75rem",
          border: "1px solid #F0D9D9", backgroundColor: "#ffffff",
          fontSize: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: "pointer", color: displayValue ? "#1A1A1A" : "#9CA3AF"
        }}
      >
        <span>{displayValue || placeholder}</span>
        <CalendarIcon size={20} color={displayValue ? "#C0392B" : "#9CA3AF"} />
      </button>

      {isOpen && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 50,
          backgroundColor: "#ffffff", borderRadius: "1rem", border: "1px solid #F0D9D9",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)", padding: "1.25rem"
        }}>
          
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <button type="button" onClick={handlePrevMonth} style={{ background: "#FFF5F5", color: "#C0392B", border: "none", cursor: "pointer", padding: "0.5rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={20} />
            </button>
            <button 
              type="button"
              onClick={() => setView(view === "days" ? "years" : "days")}
              style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "1rem", color: "#1A1A1A", padding: "0.5rem", borderRadius: "0.5rem" }}
            >
              {MONTHS[currentMonth]} {currentYear}
            </button>
            <button type="button" onClick={handleNextMonth} style={{ background: "#FFF5F5", color: "#C0392B", border: "none", cursor: "pointer", padding: "0.5rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={20} />
            </button>
          </div>

          {view === "days" ? (
            <>
              {/* Day headers */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.25rem", marginBottom: "0.5rem", textAlign: "center", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280" }}>
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>

              {/* Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.25rem" }}>
                {/* Empty slots */}
                {Array.from({ length: startDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  // Match string format for exact selection logic
                  const yyyy = currentYear;
                  const mm = String(currentMonth + 1).padStart(2, '0');
                  const dd = String(day).padStart(2, '0');
                  const dayString = `${yyyy}-${mm}-${dd}`;
                  
                  const isSelected = value === dayString;
                  
                  const today = new Date();
                  const isToday = 
                    today.getFullYear() === currentYear && 
                    today.getMonth() === currentMonth && 
                    today.getDate() === day;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDayClick(day);
                      }}
                      style={{
                        padding: "0.6rem 0.25rem", borderRadius: "0.5rem", border: "none", cursor: "pointer",
                        backgroundColor: isSelected ? "#C0392B" : isToday ? "#FFF5F5" : "transparent",
                        color: isSelected ? "#ffffff" : isToday ? "#C0392B" : "#1A1A1A",
                        fontWeight: isSelected || isToday ? 700 : 500,
                        transition: "all 0.2s ease"
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Year Selector */
            <div ref={yearsContainerRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", maxHeight: "250px", overflowY: "auto", paddingRight: "0.5rem" }}>
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  data-active={y === currentYear}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentYear(y);
                    setView("days");
                  }}
                  style={{
                    padding: "0.75rem 0.25rem", borderRadius: "0.5rem", border: "none", cursor: "pointer",
                    backgroundColor: y === currentYear ? "#C0392B" : "transparent",
                    color: y === currentYear ? "#ffffff" : "#1A1A1A",
                    fontWeight: y === currentYear ? 700 : 500,
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
