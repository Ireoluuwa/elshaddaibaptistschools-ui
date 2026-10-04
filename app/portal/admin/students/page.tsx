"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus, Search } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import StudentDetailModal from "@/components/admin/students/StudentDetailModal";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { mockStudents, promotionClasses } from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";
import type { AdminStudent, StudentStatus } from "@/types/admin.types";

const statusTone: Record<StudentStatus, "brand" | "muted" | "clay"> = {
  active: "brand",
  graduated: "muted",
  withdrawn: "clay",
};

const filterClass =
  "h-10 px-3 rounded-lg border border-line focus:border-brand outline-none text-sm text-ink bg-white";

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto_16px] sm:grid-cols-[minmax(0,1fr)_140px_100px_16px] items-center gap-4";

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
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Students"
        description="Find a student to change their class or manage their account."
        action={
          <Link href="/portal/admin/students/new" className={`${primaryButton} self-start`}>
            <Plus size={16} /> Add student
          </Link>
        }
      />

      <section className={`${panelClass} overflow-hidden`}>
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 px-5 py-4 border-b border-line">
          <div className="relative flex-1 md:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or username"
              aria-label="Search students"
              className={`${filterClass} w-full pl-9`}
            />
          </div>
          <div className="flex gap-3">
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} aria-label="Class" className={`${filterClass} flex-1`}>
              <option value="all">All classes</option>
              {promotionClasses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StudentStatus | "all")}
              aria-label="Status"
              className={`${filterClass} flex-1`}
            >
              <option value="active">Active</option>
              <option value="graduated">Graduated</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="all">Any status</option>
            </select>
          </div>
          <span className="md:ml-auto text-sm text-muted tabular-nums">
            {filtered.length} student{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
          <span>Student</span>
          <span>Class</span>
          <span>Status</span>
          <span />
        </div>

        <ul className="divide-y divide-line">
          {filtered.length === 0 ? (
            <li className="px-5 py-12 text-center text-muted text-sm">No students match.</li>
          ) : (
            filtered.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setSelected(s)}
                  className={`${rowGrid} w-full px-5 py-3 text-left hover:bg-canvas transition-colors group`}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink truncate">
                      {s.lastName} {s.firstName}
                    </span>
                    <span className="block text-xs text-muted tabular-nums">
                      {s.username}
                      <span className="sm:hidden"> · {s.className}</span>
                    </span>
                  </span>
                  <span className="hidden sm:block text-sm text-ink">
                    {s.className} {s.department && <span className="text-muted">{s.department}</span>}
                  </span>
                  <StatusBadge tone={statusTone[s.status]}>{s.status}</StatusBadge>
                  <ChevronRight size={16} className="text-muted/40 group-hover:text-brand transition-colors" />
                </button>
              </li>
            ))
          )}
        </ul>
      </section>

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

      <AdminConfirm
        isOpen={!!withdrawing}
        danger
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
