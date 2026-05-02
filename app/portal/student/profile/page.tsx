"use client";

import React from "react";
import StudentProfileBanner from "@/components/student/profile/StudentProfileBanner";
import ProfileDetailsForm from "@/components/student/profile/ProfileDetailsForm";
import StudentPasswordForm from "@/components/student/profile/StudentPasswordForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getStudentProfile } from "@/services/profile.service";

export default function StudentProfilePage() {
  // useSuspenseQuery will suspend the component, triggering loading.tsx
  const { data: profile } = useSuspenseQuery({
    queryKey: ['student-profile'],
    queryFn: getStudentProfile,
  });

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500 font-medium">Failed to load profile data.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#006442] text-white rounded-lg text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

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
        firstName={profile.firstName}
        lastName={profile.lastName}
        studentId={profile.studentId}
        currentClass={`${profile.schoolClass || ''} ${profile.department || ''}`.trim() || 'N/A'}
      />

      {/* Forms Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <ProfileDetailsForm profile={profile} />
        </div>
        <div className="lg:col-span-1">
          <StudentPasswordForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 border-t border-gray-100 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Student Portal.
      </footer>
    </div>
  );
}
