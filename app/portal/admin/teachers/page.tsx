"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminModal, {
  inputClass,
  labelClass,
  panelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { mockTeachers, promotionClasses } from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";
import type { AdminTeacher } from "@/types/admin.types";

const emptyForm = { firstName: "", lastName: "", username: "", email: "" };

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_150px_auto] items-center gap-x-4 gap-y-2";

const linkButton = "text-sm font-medium underline-offset-2 hover:underline";

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
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Teachers"
        description="Create teacher accounts and choose each class's class teacher."
        action={
          <button onClick={() => setAddOpen(true)} className={`${primaryButton} self-start`}>
            <Plus size={16} /> Add teacher
          </button>
        }
      />

      {unassigned.length > 0 && (
        <p className="text-sm text-ink px-4 py-3 rounded-lg bg-clay-soft border-l-4 border-clay">
          <span className="font-semibold">No class teacher yet:</span> {unassigned.join(", ")}
        </p>
      )}

      <section className={`${panelClass} overflow-hidden`}>
        <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
          <span>Teacher</span>
          <span>Class teacher of</span>
          <span />
        </div>
        <ul className="divide-y divide-line">
          {teachers.map((t) => (
            <li key={t.id} className={`${rowGrid} px-5 py-3.5`}>
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${t.isActive ? "text-ink" : "text-muted"}`}>
                  {t.firstName} {t.lastName}
                </p>
                <p className="text-xs text-muted truncate">
                  {t.username}
                  {t.email && ` · ${t.email}`}
                </p>
              </div>

              <div className="row-start-2 sm:row-start-auto">
                {t.isActive ? (
                  <select
                    value={t.className ?? ""}
                    onChange={(e) => assignClass(t.id, e.target.value)}
                    aria-label={`Class for ${t.firstName} ${t.lastName}`}
                    className="h-9 px-2 w-36 rounded-lg border border-line focus:border-brand outline-none text-sm text-ink bg-white"
                  >
                    <option value="">None</option>
                    {promotionClasses.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                ) : (
                  <StatusBadge tone="muted">Disabled</StatusBadge>
                )}
              </div>

              <div className="row-span-2 sm:row-span-1 flex items-center gap-4 justify-self-end">
                <button
                  onClick={() => toast.success("Password reset", `${t.username}'s password was reset.`)}
                  className={`${linkButton} text-muted hover:text-ink`}
                >
                  Reset password
                </button>
                <button
                  onClick={() => toggleActive(t)}
                  className={`${linkButton} ${t.isActive ? "text-danger" : "text-brand"}`}
                >
                  {t.isActive ? "Disable" : "Enable"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

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
            <label className={labelClass}>
              Email <span className="font-normal text-muted">(optional)</span>
            </label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
