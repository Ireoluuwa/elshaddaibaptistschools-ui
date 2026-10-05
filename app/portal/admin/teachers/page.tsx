"use client";

import React, { useMemo, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import CredentialsModal from "@/components/admin/shared/CredentialsModal";
import SetPasswordModal from "@/components/admin/shared/SetPasswordModal";
import AdminModal, {
  inputClass,
  labelClass,
  panelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { useClasses } from "@/hooks/curriculum.hooks";
import {
  useAdminTeachers,
  useAssignTeacherClass,
  useCreateTeacher,
  useStaffAccountActions,
} from "@/hooks/admin-staff.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { TeacherAccount } from "@/types/admin-staff.types";

const emptyForm = { firstName: "", lastName: "", username: "", email: "", phoneNumber: "" };

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_150px_auto] items-center gap-x-4 gap-y-2";

const linkButton = "text-sm font-medium underline-offset-2 hover:underline disabled:opacity-40";

type Credentials = { title: string; name: string; username: string; password: string };
type Pending = { kind: "remove" | "delete"; teacher: TeacherAccount };

const nameOf = (t: TeacherAccount) => `${t.firstName} ${t.lastName}`.trim() || t.username;

export default function AdminTeachersPage() {
  const { data: teachers = [], isLoading, isError, refetch } = useAdminTeachers();
  const { data: classes = [] } = useClasses();
  const createTeacher = useCreateTeacher();
  const assignClass = useAssignTeacherClass();
  const actions = useStaffAccountActions("teacher");

  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [passwordFor, setPasswordFor] = useState<TeacherAccount | null>(null);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);

  const unassigned = useMemo(
    () => classes.filter((c) => !teachers.some((t) => t.isActive && t.classId === c.id)).map((c) => c.name),
    [classes, teachers],
  );

  const handleAssign = async (teacher: TeacherAccount, classId: string) => {
    try {
      const updated = await assignClass.mutateAsync({ id: teacher.id, classId: classId || null });
      toast.success("Class updated", updated.className ? `${nameOf(teacher)} now teaches ${updated.className}.` : `${nameOf(teacher)} has no class.`);
    } catch (err) {
      toast.error("Couldn't update class", apiErrorMessage(err));
    }
  };

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
      setCredentials({ title: "Teacher added", name: nameOf(teacher), username: teacher.username, password });
    } catch (err) {
      toast.error("Couldn't add teacher", apiErrorMessage(err));
    }
  };

  const handleConfirm = async () => {
    if (!pending) return;
    const { kind, teacher } = pending;
    try {
      if (kind === "remove") await actions.remove.mutateAsync(teacher.id);
      else await actions.deletePermanently.mutateAsync(teacher.id);
      toast.success(kind === "remove" ? "Teacher removed" : "Teacher deleted", nameOf(teacher));
    } catch (err) {
      toast.error(kind === "remove" ? "Couldn't remove teacher" : "Couldn't delete teacher", apiErrorMessage(err));
    }
    setPending(null);
  };

  const handleRestore = async (teacher: TeacherAccount) => {
    try {
      await actions.restore.mutateAsync(teacher.id);
      toast.success("Teacher restored", `${nameOf(teacher)} can sign in again. Assign their class.`);
    } catch (err) {
      toast.error("Couldn't restore teacher", apiErrorMessage(err));
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
              <li key={t.id} className={`${rowGrid} px-5 py-3.5`}>
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${t.isActive ? "text-ink" : "text-muted"}`}>{nameOf(t)}</p>
                  <p className="text-xs text-muted truncate">
                    {t.username}
                    {(t.email || t.phoneNumber) && ` · ${t.email ?? t.phoneNumber}`}
                  </p>
                </div>

                <div className="row-start-2 sm:row-start-auto">
                  {t.isActive ? (
                    <select
                      value={t.classId ?? ""}
                      onChange={(e) => handleAssign(t, e.target.value)}
                      disabled={assignClass.isPending}
                      aria-label={`Class for ${nameOf(t)}`}
                      className="h-9 px-2 w-36 rounded-lg border border-line focus:border-brand outline-none text-sm text-ink bg-white"
                    >
                      <option value="">None</option>
                      {classes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <StatusBadge tone="clay">Removed</StatusBadge>
                  )}
                </div>

                <div className="row-span-2 sm:row-span-1 flex items-center gap-4 justify-self-end">
                  {t.isActive ? (
                    <>
                      <button onClick={() => setPasswordFor(t)} className={`${linkButton} text-ink`}>
                        Password
                      </button>
                      <button onClick={() => setPending({ kind: "remove", teacher: t })} className={`${linkButton} text-danger`}>
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleRestore(t)} disabled={actions.restore.isPending} className={`${linkButton} text-brand`}>
                        Restore
                      </button>
                      <button onClick={() => setPending({ kind: "delete", teacher: t })} className={`${linkButton} text-danger`}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <AdminModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add teacher"
        description="We'll create a temporary password for you to share with them."
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

      {passwordFor && (
        <SetPasswordModal
          personName={nameOf(passwordFor)}
          onSubmit={(newPassword) => actions.setPassword.mutateAsync({ id: passwordFor.id, newPassword })}
          onClose={() => setPasswordFor(null)}
          onChanged={(c) => {
            setCredentials({ title: "Password changed", name: nameOf(passwordFor), ...c });
            setPasswordFor(null);
          }}
        />
      )}

      {credentials && <CredentialsModal {...credentials} onClose={() => setCredentials(null)} />}

      <AdminConfirm
        isOpen={!!pending}
        danger
        onClose={() => setPending(null)}
        onConfirm={handleConfirm}
        isPending={actions.remove.isPending || actions.deletePermanently.isPending}
        title={pending?.kind === "remove" ? `Remove ${pending && nameOf(pending.teacher)}?` : `Delete ${pending && nameOf(pending.teacher)} permanently?`}
        confirmText={pending?.kind === "remove" ? "Remove teacher" : "Delete permanently"}
        message={
          pending?.kind === "remove"
            ? "They won't be able to sign in and will be taken off their class. You can restore them later."
            : "This deletes their account and can't be undone. It's only allowed if they haven't posted any assignments."
        }
      />
    </div>
  );
}
