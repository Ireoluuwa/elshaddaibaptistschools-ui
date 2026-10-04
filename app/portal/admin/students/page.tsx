"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, UserPlus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import StudentDetailModal from "@/components/admin/students/StudentDetailModal";
import { primaryButton } from "@/components/admin/shared/AdminModal";
import { mockStudents, promotionClasses } from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";
import type { AdminStudent, StudentStatus } from "@/types/admin.types";

const statusTone: Record<StudentStatus, "green" | "gray" | "blue"> = {
  active: "green",
  graduated: "blue",
  withdrawn: "gray",
};

const filterClass =
  "h-10 px-3 rounded-lg border border-gray-200 focus:border-[#006442] outline-none text-sm bg-white";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudent[]>(mockStudents);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StudentStatus | "all">("active");
  const [selected, setSelected] = useState<AdminStudent | null>(null);
  const [withdrawing, setWithdrawing] = useState<AdminStudent | null>(null);

  const q = search.toLowerCase();
  const filtered = students.filter(
    (s) =>
      (classFilter === "all" || s.className === classFilter) &&
      (statusFilter === "all" || s.status === statusFilter) &&
      `${s.firstName} ${s.lastName} ${s.username}`.toLowerCase().includes(q),
  );

  const update = (next: AdminStudent) =>
    setStudents((prev) => prev.map((s) => (s.id === next.id ? next : s)));

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <PageHeader
        title="Students"
        description="Find a student, change their class or manage their account."
        action={
          <Link href="/portal/admin/students/new" className={`${primaryButton} self-start`}>
            <UserPlus size={16} /> Add student
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="relative flex-1 md:max-w-xs">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or username..."
              className="w-full pl-10 pr-4 h-10 rounded-lg border border-gray-200 focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm bg-white"
            />
          </div>
          <div className="flex gap-3">
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className={`${filterClass} flex-1`}>
              <option value="all">All classes</option>
              {promotionClasses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StudentStatus | "all")}
              className={`${filterClass} flex-1`}
            >
              <option value="active">Active</option>
              <option value="graduated">Graduated</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="all">All statuses</option>
            </select>
          </div>
          <span className="md:ml-auto self-center text-xs text-gray-400">
            {filtered.length} student{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* List */}
        <ul className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <li className="px-6 py-10 text-center text-gray-400 text-sm">No students found.</li>
          ) : (
            filtered.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setSelected(s)}
                  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50/50 transition-colors group text-left"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {s.firstName[0]}
                    {s.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-secondary truncate">
                      {s.lastName} {s.firstName}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">{s.username}</p>
                  </div>
                  <span className="hidden sm:block text-sm text-gray-500 w-32">
                    {s.className} {s.department ?? ""}
                  </span>
                  <StatusBadge tone={statusTone[s.status]}>{s.status}</StatusBadge>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#006442] transition-colors" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {selected && (
        <StudentDetailModal
          key={selected.id}
          student={selected}
          onClose={() => setSelected(null)}
          onSave={(next) => {
            update(next);
            setSelected(null);
            toast.success("Student updated", `${next.firstName} is now in ${next.className}.`);
          }}
          onWithdraw={(s) => {
            setSelected(null);
            setWithdrawing(s);
          }}
          onResetPassword={(s) =>
            toast.success("Password reset", `${s.username}'s password was reset to the default.`)
          }
        />
      )}

      <ConfirmModal
        isOpen={!!withdrawing}
        onClose={() => setWithdrawing(null)}
        onConfirm={() => {
          if (withdrawing) update({ ...withdrawing, status: "withdrawn" });
          toast.success("Student withdrawn", `${withdrawing?.firstName} can no longer sign in.`);
          setWithdrawing(null);
        }}
        title="Withdraw this student?"
        message={`${withdrawing?.lastName} ${withdrawing?.firstName} will be removed from ${withdrawing?.className} and their account disabled. Their past results are kept.`}
        confirmText="Withdraw"
      />
    </div>
  );
}
