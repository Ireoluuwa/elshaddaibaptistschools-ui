"use client";

import React, { useState } from "react";
import { AlertTriangle, KeyRound, Power, UserPlus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { mockTeachers, promotionClasses } from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";
import type { AdminTeacher } from "@/types/admin.types";

const emptyForm = { firstName: "", lastName: "", username: "", email: "" };

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<AdminTeacher[]>(mockTeachers);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const unassigned = promotionClasses.filter(
    (c) => !teachers.some((t) => t.isActive && t.className === c),
  );

  // A class has one class teacher; assigning it moves it off whoever had it.
  const assignClass = (teacherId: string, className: string) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === teacherId) return { ...t, className: className || undefined };
        if (className && t.className === className) return { ...t, className: undefined };
        return t;
      }),
    );
    const teacher = teachers.find((t) => t.id === teacherId);
    toast.success(
      "Class updated",
      className ? `${teacher?.firstName} now teaches ${className}.` : `${teacher?.firstName} has no class.`,
    );
  };

  const toggleActive = (teacher: AdminTeacher) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacher.id
          ? { ...t, isActive: !t.isActive, className: t.isActive ? undefined : t.className }
          : t,
      ),
    );
    toast.info(teacher.isActive ? "Account disabled" : "Account enabled", teacher.username);
  };

  const handleAdd = () => {
    setTeachers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...form, email: form.email || undefined, isActive: true },
    ]);
    toast.success("Teacher added", `${form.firstName} can sign in as ${form.username}.`);
    setForm(emptyForm);
    setAddOpen(false);
  };

  const canAdd = form.firstName.trim() && form.lastName.trim() && form.username.trim();

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <PageHeader
        title="Teachers"
        description="Create teacher accounts and assign class teachers."
        action={
          <button onClick={() => setAddOpen(true)} className={`${primaryButton} self-start`}>
            <UserPlus size={16} /> Add teacher
          </button>
        }
      />

      {unassigned.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-50 border border-amber-100 text-sm text-amber-800">
          <AlertTriangle size={16} className="shrink-0" />
          <span>
            <span className="font-semibold">No class teacher:</span> {unassigned.join(", ")}
          </span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {teachers.map((t) => (
            <li
              key={t.id}
              className={`flex flex-wrap items-center gap-x-4 gap-y-3 px-6 py-4 ${t.isActive ? "" : "opacity-60"}`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  {t.firstName[0]}
                  {t.lastName[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-secondary truncate">
                    {t.firstName} {t.lastName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {t.username}
                    {t.email && ` • ${t.email}`}
                  </p>
                </div>
              </div>

              {t.isActive ? (
                <select
                  value={t.className ?? ""}
                  onChange={(e) => assignClass(t.id, e.target.value)}
                  className="h-9 px-2 w-36 rounded-lg border border-gray-200 focus:border-[#006442] outline-none text-sm bg-white"
                >
                  <option value="">No class</option>
                  {promotionClasses.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              ) : (
                <StatusBadge tone="gray">Disabled</StatusBadge>
              )}

              <div className="flex items-center gap-1">
                <button
                  title="Reset password"
                  onClick={() => toast.success("Password reset", `${t.username}'s password was reset.`)}
                  className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all"
                >
                  <KeyRound size={16} />
                </button>
                <button
                  title={t.isActive ? "Disable account" : "Enable account"}
                  onClick={() => toggleActive(t)}
                  className={`p-2 rounded-lg transition-all ${
                    t.isActive
                      ? "text-gray-400 hover:text-red-600 hover:bg-red-50"
                      : "text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  <Power size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AdminModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add teacher"
        description="They'll sign in with this username and the default password."
        footer={
          <>
            <button onClick={() => setAddOpen(false)} className={secondaryButton}>
              Cancel
            </button>
            <button onClick={handleAdd} disabled={!canAdd} className={primaryButton}>
              Add teacher
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>First name</label>
              <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Last name</label>
              <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Username</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="e.g. mrs.okafor" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email (optional)</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
