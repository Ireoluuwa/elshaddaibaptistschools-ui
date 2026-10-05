"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRightLeft, KeyRound, Mail, Phone, RotateCcw, UserX } from "lucide-react";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { panelClass } from "@/components/admin/shared/AdminModal";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import ChangeClassModal from "@/components/admin/students/ChangeClassModal";
import SetPasswordModal from "@/components/admin/students/SetPasswordModal";
import CredentialsModal from "@/components/admin/shared/CredentialsModal";
import {
  useAdminStudent,
  useDeleteStudent,
  useRemoveStudent,
  useRestoreStudent,
} from "@/hooks/admin-students.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { EnrollmentOutcome, StudentStatus } from "@/types/admin-students.types";

interface StudentPageProps {
  params: Promise<{ id: string }>;
}

const statusTone: Record<StudentStatus, "brand" | "muted" | "clay"> = {
  active: "brand",
  graduated: "muted",
  removed: "clay",
};

const outcomeTone: Record<EnrollmentOutcome, "brand" | "clay" | "muted"> = {
  promoted: "brand",
  graduated: "brand",
  repeated: "clay",
  withdrawn: "muted",
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const ageFrom = (dob: string) => {
  const birth = new Date(dob);
  const now = new Date();
  const hadBirthday =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  return now.getFullYear() - birth.getFullYear() - (hadBirthday ? 0 : 1);
};

const NotProvided = () => <span className="text-muted">Not provided</span>;

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 px-5 py-3 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="text-ink break-words">{children}</dd>
    </div>
  );
}

export default function AdminStudentPage({ params }: StudentPageProps) {
  const { id } = use(params);
  const { data: student, isLoading, isError, refetch } = useAdminStudent(id);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);
  const [classOpen, setClassOpen] = useState(false);
  const [confirming, setConfirming] = useState<"remove" | "delete" | null>(null);
  const router = useRouter();
  const removeStudent = useRemoveStudent();
  const restoreStudent = useRestoreStudent();
  const deleteStudent = useDeleteStudent();

  const back = (
    <Link
      href="/portal/admin/students"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink self-start"
    >
      <ArrowLeft size={16} /> All students
    </Link>
  );

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {back}
        <div className={`${panelClass} h-28 animate-pulse`} />
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`${panelClass} h-48 animate-pulse`} />
          <div className={`${panelClass} h-48 animate-pulse`} />
        </div>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {back}
        <div className={`${panelClass} px-5 py-12 text-center`}>
          <p className="text-sm text-muted">Couldn&apos;t load this student.</p>
          <button onClick={() => refetch()} className="mt-2 text-sm font-semibold text-brand hover:underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${student.lastName} ${student.firstName}`;
  const isRemoved = student.status === "removed";

  const handleRemove = async () => {
    try {
      await removeStudent.mutateAsync(student.id);
      toast.success("Student removed", `${student.firstName} no longer appears in teacher lists.`);
      setConfirming(null);
    } catch (err) {
      toast.error("Couldn't remove student", apiErrorMessage(err));
    }
  };

  const handleRestore = async () => {
    try {
      await restoreStudent.mutateAsync(student.id);
      toast.success("Student restored", `${student.firstName} is back in ${student.className ?? "their class"}.`);
    } catch (err) {
      toast.error("Couldn't restore student", apiErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudent.mutateAsync(student.id);
      toast.success("Student deleted", fullName);
      router.push("/portal/admin/students");
    } catch (err) {
      setConfirming(null);
      toast.error("Couldn't delete student", apiErrorMessage(err));
    }
  };

  const actionButton =
    "h-9 px-3 inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg transition-colors shrink-0";
  const initials = `${student.firstName[0] ?? ""}${student.lastName[0] ?? ""}`.toUpperCase();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {back}

      {isRemoved && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 rounded-lg bg-clay-soft border-l-4 border-clay">
          <p className="flex-1 text-sm text-ink">
            <span className="font-semibold">This student has been removed.</span> They can&apos;t sign in and
            don&apos;t appear in teacher lists. Their results are kept.
          </p>
          <button
            onClick={handleRestore}
            disabled={restoreStudent.isPending}
            className={`${actionButton} text-white bg-brand hover:bg-brand-dark self-start sm:self-auto`}
          >
            <RotateCcw size={15} /> Restore
          </button>
        </div>
      )}

      {/* Identity */}
      <section className={`${panelClass} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4`}>
        {student.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- storage URL
          <img src={student.avatarUrl} alt={fullName} className="w-16 h-16 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-ink text-white flex items-center justify-center text-xl font-bold shrink-0">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-ink tracking-tight truncate">{fullName}</h1>
          <p className="text-sm text-muted tabular-nums">{student.username}</p>
        </div>
        <div className="flex sm:flex-col sm:items-end gap-x-4 gap-y-1.5">
          <span className="text-sm font-semibold text-ink">
            {student.className ?? "No class"}{" "}
            {student.department && <span className="font-normal text-muted">{student.department}</span>}
          </span>
          <StatusBadge tone={statusTone[student.status]}>{student.status}</StatusBadge>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Personal */}
        <section className={`${panelClass} overflow-hidden`}>
          <header className="px-5 py-4 border-b border-line">
            <h2 className="font-semibold text-ink">Personal details</h2>
          </header>
          <dl className="divide-y divide-line">
            <DetailRow label="Date of birth">
              {student.dateOfBirth ? (
                <>
                  {formatDate(student.dateOfBirth)}{" "}
                  <span className="text-muted">· {ageFrom(student.dateOfBirth)} years old</span>
                </>
              ) : (
                <NotProvided />
              )}
            </DetailRow>
            <DetailRow label="Year joined">{student.yearJoined ?? <NotProvided />}</DetailRow>
            <DetailRow label="Home address">{student.homeAddress ?? <NotProvided />}</DetailRow>
          </dl>
        </section>

        {/* Guardian */}
        <section className={`${panelClass} overflow-hidden`}>
          <header className="px-5 py-4 border-b border-line">
            <h2 className="font-semibold text-ink">Parent / guardian</h2>
          </header>
          <dl className="divide-y divide-line">
            <DetailRow label="Name">{student.guardianName ?? <NotProvided />}</DetailRow>
            <DetailRow label="Phone">
              {student.guardianPhone ? (
                <a href={`tel:${student.guardianPhone}`} className="inline-flex items-center gap-1.5 text-brand hover:underline">
                  <Phone size={14} /> {student.guardianPhone}
                </a>
              ) : (
                <NotProvided />
              )}
            </DetailRow>
            <DetailRow label="Email">
              {student.guardianEmail ? (
                <a href={`mailto:${student.guardianEmail}`} className="inline-flex items-center gap-1.5 text-brand hover:underline break-all">
                  <Mail size={14} className="shrink-0" /> {student.guardianEmail}
                </a>
              ) : (
                <NotProvided />
              )}
            </DetailRow>
          </dl>
        </section>
      </div>

      {/* Class history */}
      <section className={`${panelClass} overflow-hidden`}>
        <header className="px-5 py-4 border-b border-line">
          <h2 className="font-semibold text-ink">Class history</h2>
        </header>
        {student.enrollments.length === 0 ? (
          <p className="px-5 py-8 text-sm text-muted text-center">No class history yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {student.enrollments.map((e) => (
              <li key={e.session} className="grid grid-cols-[100px_minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 text-sm">
                <span className="text-muted tabular-nums">{e.session}</span>
                <span className="font-medium text-ink truncate">
                  {e.className} {e.department && <span className="font-normal text-muted">{e.department}</span>}
                </span>
                {e.outcome ? (
                  <StatusBadge tone={outcomeTone[e.outcome]}>{e.outcome}</StatusBadge>
                ) : (
                  <StatusBadge tone="muted">{e.isCurrentSession ? "current" : "no outcome"}</StatusBadge>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Manage */}
      <section className={`${panelClass} overflow-hidden`}>
        <header className="px-5 py-4 border-b border-line">
          <h2 className="font-semibold text-ink">Manage</h2>
          <p className="text-sm text-muted mt-0.5">
            Signs in as <span className="font-medium text-ink tabular-nums">{student.username}</span>
          </p>
        </header>
        <ul className="divide-y divide-line">
          <li className="flex items-center gap-4 px-5 py-3.5">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink">Class</p>
              <p className="text-xs text-muted">Move them to another class or department.</p>
            </div>
            <button onClick={() => setClassOpen(true)} className={`${actionButton} text-ink border border-line hover:border-ink/30`}>
              <ArrowRightLeft size={15} /> Change class
            </button>
          </li>
          <li className="flex items-center gap-4 px-5 py-3.5">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink">Password</p>
              <p className="text-xs text-muted">Forgotten their password? Set a new one.</p>
            </div>
            <button onClick={() => setPasswordOpen(true)} className={`${actionButton} text-ink border border-line hover:border-ink/30`}>
              <KeyRound size={15} /> Change password
            </button>
          </li>
          {!isRemoved && (
            <li className="flex items-center gap-4 px-5 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink">Remove student</p>
                <p className="text-xs text-muted">Hides them from teachers and stops them signing in. Results are kept.</p>
              </div>
              <button onClick={() => setConfirming("remove")} className={`${actionButton} text-danger border border-danger/30 hover:bg-clay-soft`}>
                <UserX size={15} /> Remove
              </button>
            </li>
          )}
        </ul>
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-1">
        <p className="flex-1 text-xs text-muted">
          Added by mistake? Students with no results or reports can be deleted permanently.
        </p>
        <button onClick={() => setConfirming("delete")} className="text-sm font-medium text-danger hover:underline underline-offset-2 self-start">
          Delete permanently
        </button>
      </div>

      {classOpen && <ChangeClassModal student={student} onClose={() => setClassOpen(false)} />}

      <AdminConfirm
        isOpen={confirming === "remove"}
        danger
        onClose={() => setConfirming(null)}
        onConfirm={handleRemove}
        isPending={removeStudent.isPending}
        title={`Remove ${student.firstName}?`}
        confirmText="Remove student"
        message="They won't appear in any teacher list (results, weekly reports) and can't sign in. Their past results are kept, and you can restore them later."
      />

      <AdminConfirm
        isOpen={confirming === "delete"}
        danger
        onClose={() => setConfirming(null)}
        onConfirm={handleDelete}
        isPending={deleteStudent.isPending}
        title={`Delete ${student.firstName} permanently?`}
        confirmText="Delete permanently"
        message="This deletes their account and class history and can't be undone. It's only allowed if they have no results or weekly reports."
      />

      {passwordOpen && (
        <SetPasswordModal
          studentId={student.id}
          studentName={`${student.firstName} ${student.lastName}`}
          onClose={() => setPasswordOpen(false)}
          onChanged={(c) => {
            setPasswordOpen(false);
            setCredentials(c);
          }}
        />
      )}

      {credentials && (
        <CredentialsModal
          title="Password changed"
          name={`${student.firstName} ${student.lastName}`}
          username={credentials.username}
          password={credentials.password}
          onClose={() => setCredentials(null)}
        />
      )}
    </div>
  );
}
