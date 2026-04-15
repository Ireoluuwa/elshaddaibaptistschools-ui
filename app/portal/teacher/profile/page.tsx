"use client";

import React from "react";
import ProfileForm from "@/components/teacher/profile/ProfileForm";
import PasswordForm from "@/components/teacher/profile/PasswordForm";
import ReadOnlyFields from "@/components/teacher/profile/ReadOnlyFields";

export default function TeacherProfilePage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight">
          My Profile
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your personal information and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Read Only Info */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <ReadOnlyFields />
        </div>

        {/* Right Column: Editable Forms */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <ProfileForm />
          <PasswordForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-300 text-xs py-6 mt-10 border-t border-gray-100">
        &copy; {new Date().getFullYear()} EduPortal Teacher System. All rights
        reserved.
      </footer>
    </div>
  );
}
