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
        <h2 className="text-[#0e2e1d] text-lg font-bold mb-1">Personal Details</h2>
        <p className="text-gray-400 text-xs">Update your personal information and contact details.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Profile Picture Upload */}
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
              {/* Placeholder image, in a real app this would be state */}
              <img src="/logo.png" alt="Profile" className="w-full h-full object-cover opacity-50" />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-7 h-7 bg-[#006442] hover:bg-[#005236] text-white rounded-full flex items-center justify-center transition-all shadow-md"
            >
              <Camera size={14} />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0e2e1d] mb-1">Profile Picture</p>
            <p className="text-xs text-gray-400">JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full my-1" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Contact Address</label>
            <input
              type="text"
              defaultValue="123 Education Avenue, School District, Lagos"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Short Bio</label>
            <textarea
              rows={4}
              defaultValue="Passionate educator with 10+ years of experience in making complex subjects accessible and engaging for students."
              className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d] resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
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
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
