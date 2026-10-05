"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { panelClass } from "@/components/admin/shared/AdminModal";
import { useAdminStudent } from "@/hooks/admin-students.hooks";
import type { EnrollmentOutcome, StudentStatus } from "@/types/admin-students.types";

interface StudentPageProps {
  params: Promise<{ id: string }>;
}

const statusTone: Record<StudentStatus, "brand" | "muted" | "clay"> = {
  active: "brand",
  graduated: "muted",
  withdrawn: "clay",
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
  const initials = `${student.firstName[0] ?? ""}${student.lastName[0] ?? ""}`.toUpperCase();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {back}

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
    </div>
  );
}
