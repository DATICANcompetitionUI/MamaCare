"use client";

import { PatientProfile } from "@/lib/dashboard-data";
import { CalendarDays, User, ActivitySquare } from "lucide-react";

/**
 * components/provider/PatientProfileCard.tsx
 *
 * Displays a summary of the patient's profile for the provider.
 */

export default function PatientProfileCard({ profile }: { profile: PatientProfile }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-primary shadow-sm text-primary">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{profile.fullName}</h2>
          <p className="text-sm text-gray-600 font-medium">Assigned Patient</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Pregnancy Details</h3>
            
            <div className="flex items-start gap-3">
              <ActivitySquare className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Gestational Age</p>
                <p className="font-semibold text-gray-900">Week {profile.gestationalWeek}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CalendarDays className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Estimated Due Date</p>
                <p className="font-semibold text-gray-900">{new Date(profile.edd).toLocaleDateString()} ({profile.daysUntilDue} days to go)</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Medical Profile</h3>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Pre-existing Conditions</p>
              {profile.conditions && profile.conditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.conditions.map((cond, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md uppercase tracking-wider"
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-900">No known pre-existing conditions.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
