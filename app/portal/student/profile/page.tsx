"use client";

import React from "react";
import StudentProfileBanner from "@/components/student/profile/StudentProfileBanner";
import PersonalDetailsForm from "@/components/student/profile/PersonalDetailsForm";
import GuardianForm from "@/components/student/profile/GuardianForm";
import StudentPasswordForm from "@/components/student/profile/StudentPasswordForm";

export default function StudentProfilePage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
          Profile Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your identity, personal details, guardian contacts, and security.
        </p>
      </div>

      {/* Main Banner Component */}
      <StudentProfileBanner
        firstName="Student"
        lastName="Name"
        studentId="STU-2025-042"
        currentClass="SS2 Science"
      />

      {/* Forms Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <PersonalDetailsForm />
        <GuardianForm />
        <StudentPasswordForm />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 border-t border-gray-100 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Student Portal.
      </footer>
    </div>
  );
}
