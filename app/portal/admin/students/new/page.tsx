"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddStudentHeader from "@/components/teacher/students/AddStudentHeader";
import ManualEntry from "@/components/teacher/students/ManualEntry";
import BatchUpload from "@/components/teacher/students/BatchUpload";

export default function AdminAddStudentPage() {
  const [activeTab, setActiveTab] = useState<"manual" | "batch">("manual");

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <Link
        href="/portal/admin/students"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink self-start"
      >
        <ArrowLeft size={16} /> Back to students
      </Link>

      <AddStudentHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "manual" ? <ManualEntry /> : <BatchUpload />}
    </div>
  );
}
