"use client";

import React, { useState } from "react";
import { Camera, CheckCircle2 } from "lucide-react";

export default function ProfileForm() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-[#0e2e1d] text-lg font-bold mb-1">Contact Information</h2>
        <p className="text-gray-400 text-xs">Update your email, phone, and address.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Email Address</label>
            <input
              type="email"
              defaultValue="mranderson@elshaddai.edu"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Phone Number</label>
            <input
              type="tel"
              defaultValue="+234 800 123 4567"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Contact Address</label>
            <textarea
              rows={3}
              defaultValue="123 Education Avenue, School District, Lagos"
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
                <CheckCircle2 size={18} className="mr-2" />
                Saved
              </>
            ) : (
              "Save Contact Details"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
