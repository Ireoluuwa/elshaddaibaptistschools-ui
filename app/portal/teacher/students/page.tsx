"use client";

import React, { useState } from "react";
import AddStudentHeader from "@/components/teacher/students/AddStudentHeader";
import ManualEntry from "@/components/teacher/students/ManualEntry";
import BatchUpload from "@/components/teacher/students/BatchUpload";

export default function AddStudentPage() {
  const [activeTab, setActiveTab] = useState<"manual" | "batch">("manual");

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <AddStudentHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      {activeTab === "manual" ? <ManualEntry /> : <BatchUpload />}

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Teacher Portal.
      </footer>
    </div>
  );
}
