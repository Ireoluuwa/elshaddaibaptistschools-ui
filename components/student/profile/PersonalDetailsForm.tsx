"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function PersonalDetailsForm() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-[#0e2e1d] text-lg font-bold mb-1">Personal Details</h2>
        <p className="text-gray-400 text-xs">Update your date of birth, year joined, and home address.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5 flex-1">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
            <input
              type="date"
              defaultValue="2010-05-14"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Year Joined</label>
            <input
              type="number"
              defaultValue="2021"
              min="2000"
              max={new Date().getFullYear()}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Home Address</label>
            <textarea
              rows={3}
              defaultValue="Block B, Plot 14, Unity Estate, Lagos"
              className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d] resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 mt-auto">
          <button
            type="submit"
            className="h-11 px-6 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 min-w-[140px]"
          >
            {isSaved ? (
              <>
                <CheckCircle2 size={18} className="mr-2 text-emerald-300" />
                Saved
              </>
            ) : (
              "Save Details"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
