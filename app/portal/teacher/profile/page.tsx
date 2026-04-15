"use client";

import React from "react";
import ProfileBanner from "@/components/teacher/profile/ProfileBanner";
import ProfileForm from "@/components/teacher/profile/ProfileForm";
import PasswordForm from "@/components/teacher/profile/PasswordForm";

export default function TeacherProfilePage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
          Profile Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your identity, contact information, and security.
        </p>
      </div>

      {/* Main Banner Component */}
      <ProfileBanner
        name="Mr. Anderson"
        role="Senior Teacher"
        id="TCH-2023-001"
        subjects="Math & Physics"
        classes="SS1, SS2"
      />

      {/* Forms Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ProfileForm />
        <PasswordForm />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 border-t border-gray-100 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Teacher Portal.
      </footer>
    </div>
  );
}
