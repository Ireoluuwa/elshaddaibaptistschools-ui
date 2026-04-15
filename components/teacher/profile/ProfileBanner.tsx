"use client";

import React from "react";
import { Camera, Shield, BookOpen, GraduationCap } from "lucide-react";

interface ProfileBannerProps {
  name: string;
  role: string;
  id: string;
  subjects: string;
  classes: string;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({
  name,
  role,
  id,
  subjects,
  classes,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm relative overflow-hidden">
      {/* Subtle decorative background - no gradient as requested previously */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#006442]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-4 relative z-10 shrink-0">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
            <img
              src="/logo.png"
              alt="Profile"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-1 right-1 w-8 h-8 bg-[#006442] hover:bg-[#005236] text-white rounded-full flex items-center justify-center transition-all shadow-lg border-2 border-white active:scale-95"
          >
            <Camera size={14} />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col gap-6 relative z-10 w-full text-center md:text-left">
        <div>
          <h2 className="text-2xl font-black text-[#000000] leading-tight">
            {name}
          </h2>
          <p className="text-gray-500 font-medium">{role}</p>
        </div>

        {/* Badges/Read-Only Items - Refined palette to match theme */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f8f9f8] text-[#0e2e1d] rounded-lg border border-gray-100">
            <Shield size={14} className="text-[#006442]" />
            <span className="text-xs font-bold tracking-tight">{id}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f0f7f4] text-[#006442] rounded-lg border border-[#006442]/10">
            <BookOpen size={14} className="text-[#006442]" />
            <span className="text-xs font-bold tracking-tight">{subjects}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0e2e1d]/5 text-[#0e2e1d] rounded-lg border border-[#0e2e1d]/10">
            <GraduationCap size={14} className="text-[#0e2e1d]" />
            <span className="text-xs font-bold tracking-tight">{classes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
