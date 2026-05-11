"use client";

import React from "react";
import TeacherProfileBanner from "@/components/teacher/profile/TeacherProfileBanner";
import TeacherProfileDetailsForm from "@/components/teacher/profile/TeacherProfileDetailsForm";
import TeacherPasswordForm from "@/components/teacher/profile/TeacherPasswordForm";
import { useSuspenseTeacherProfile } from "@/hooks/profile.hooks";

export default function TeacherProfilePage() {
  const { data: profile } = useSuspenseTeacherProfile();

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500 font-medium">Failed to load teacher profile.</p>
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
          Teacher Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your personal information, contact details, and account security.
        </p>
      </div>

      {/* Main Banner Component */}
      <TeacherProfileBanner
        firstName={profile.firstName}
        lastName={profile.lastName}
        username={profile.username}
        role={profile.role}
        currentClass={`${profile.schoolClass || ''} ${profile.department || ''}`.trim()}
        profileId={profile.id}
        avatarUrl={profile.avatarUrl}
      />

      {/* Forms Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <TeacherProfileDetailsForm profile={profile} />
        </div>
        <div className="lg:col-span-1">
          <TeacherPasswordForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 border-t border-gray-100 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Teacher Portal.
      </footer>
    </div>
  );
}
