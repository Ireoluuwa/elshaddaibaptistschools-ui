"use client";

import React from "react";
import { Camera, Shield, BookOpen, GraduationCap } from "lucide-react";
import ProfileForm from "@/components/teacher/profile/ProfileForm";
import PasswordForm from "@/components/teacher/profile/PasswordForm";

export default function TeacherProfilePage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight">
          My Profile
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your personal information and security settings.
        </p>
      </div>

      {/* Top Profile Banner (Read-Only + Avatar) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background */}
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
              className="absolute bottom-1 right-1 w-8 h-8 bg-[#006442] hover:bg-[#005236] text-white rounded-full flex items-center justify-center transition-all shadow-lg border-2 border-white"
            >
              <Camera size={14} />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-6 relative z-10 w-full text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-[#0e2e1d]">Mr. Anderson</h2>
            <p className="text-gray-500 font-medium">Senior Teacher</p>
          </div>

          {/* Badges/Read-Only Items */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100/50">
              <Shield size={14} className="text-blue-500" />
              <span className="text-xs font-semibold">TCH-2023-001</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100/50">
              <BookOpen size={14} className="text-emerald-500" />
              <span className="text-xs font-semibold">Math & Physics</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg border border-orange-100/50">
              <GraduationCap size={14} className="text-orange-500" />
              <span className="text-xs font-semibold">SS1, SS2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileForm />
        <PasswordForm />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-300 text-xs py-6 mt-4 border-t border-gray-100">
        &copy; {new Date().getFullYear()} EduPortal Teacher System. All rights
        reserved.
      </footer>
    </div>
  );
}
