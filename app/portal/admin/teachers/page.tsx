"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Loader2, Plus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import CredentialsModal from "@/components/admin/shared/CredentialsModal";
import AdminModal, {
  inputClass,
  labelClass,
  panelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { useClasses } from "@/hooks/curriculum.hooks";
import { useAdminTeachers, useCreateTeacher } from "@/hooks/admin-staff.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { TeacherAccount } from "@/types/admin-staff.types";

const emptyForm = { firstName: "", lastName: "", username: "", email: "", phoneNumber: "" };

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_140px_16px] items-center gap-x-4";

type Credentials = { title: string; name: string; username: string; password: string; description?: string };

const nameOf = (t: TeacherAccount) => `${t.firstName} ${t.lastName}`.trim() || t.username;

export default function AdminTeachersPage() {
  const { data: teachers = [], isLoading, isError, refetch } = useAdminTeachers();
  const { data: classes = [] } = useClasses();
  const createTeacher = useCreateTeacher();

  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  const unassigned = useMemo(
    () => classes.filter((c) => !teachers.some((t) => t.isActive && t.classId === c.id)).map((c) => c.name),
    [classes, teachers],
  );

  const handleAdd = async () => {
    try {
      const { teacher, password } = await createTeacher.mutateAsync({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        username: form.username.trim(),
        email: form.email.trim() || undefined,
        phoneNumber: form.phoneNumber.trim() || undefined,
      });
      setAddOpen(false);
      setForm(emptyForm);
      setCredentials({
        title: "Teacher added",
        name: nameOf(teacher),
        username: teacher.username,
        password,
        description: "Share these with the teacher. They should change the password after signing in.",
      });
    } catch (err) {
      toast.error("Couldn't add teacher", apiErrorMessage(err));
    }
  };

  const canAdd = form.firstName.trim() && form.lastName.trim() && form.username.trim() && !createTeacher.isPending;

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

      {!isLoading && unassigned.length > 0 && (
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
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <li key={i} className="px-5 py-3.5">
                <div className="h-9 rounded-lg bg-canvas animate-pulse" />
              </li>
            ))
          ) : isError ? (
            <li className="px-5 py-12 text-center text-sm text-muted">
              Couldn&apos;t load teachers.{" "}
              <button onClick={() => refetch()} className="font-semibold text-brand hover:underline">
                Try again
              </button>
            </li>
          ) : teachers.length === 0 ? (
            <li className="px-5 py-12 text-center text-sm text-muted">No teachers yet.</li>
          ) : (
            teachers.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/portal/admin/teachers/${t.id}`}
                  className={`${rowGrid} px-5 py-3.5 hover:bg-canvas transition-colors group`}
                >
                  <span className="min-w-0">
                    <span className={`block text-sm font-medium truncate ${t.isActive ? "text-ink" : "text-muted"}`}>
                      {nameOf(t)}
                    </span>
                    <span className="block text-xs text-muted truncate">
                      {t.username}
                      {(t.email || t.phoneNumber) && ` · ${t.email ?? t.phoneNumber}`}
                    </span>
                  </span>

                  <span className="col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-self-end sm:justify-self-start text-sm">
                    {!t.isActive ? (
                      <StatusBadge tone="muted">Removed</StatusBadge>
                    ) : t.className ? (
                      <span className="font-semibold text-ink">{t.className}</span>
                    ) : (
                      <span className="text-clay">No class</span>
                    )}
                  </span>

                  <ChevronRight size={16} className="hidden sm:block text-muted/40 group-hover:text-brand transition-colors" />
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>

      <AdminModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add teacher"
        description="They'll sign in with this username and the password 0000, then change it."
        footer={
          <>
            <button onClick={() => setAddOpen(false)} disabled={createTeacher.isPending} className={secondaryButton}>
              Cancel
            </button>
            <button onClick={handleAdd} disabled={!canAdd} className={primaryButton}>
              {createTeacher.isPending && <Loader2 size={16} className="animate-spin" />}
              Add teacher
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="t-first" className={labelClass}>First name</label>
              <input id="t-first" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label htmlFor="t-last" className={labelClass}>Last name</label>
              <input id="t-last" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="t-username" className={labelClass}>Username</label>
            <input id="t-username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="e.g. EBS/TCH/007" className={inputClass} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="t-email" className={labelClass}>
                Email <span className="font-normal text-muted">(optional)</span>
              </label>
              <input id="t-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label htmlFor="t-phone" className={labelClass}>
                Phone <span className="font-normal text-muted">(optional)</span>
              </label>
              <input id="t-phone" type="tel" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>
      </AdminModal>

      {credentials && <CredentialsModal {...credentials} onClose={() => setCredentials(null)} />}

    </div>
  );
}
