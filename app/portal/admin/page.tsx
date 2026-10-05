"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import {
  mockStudents,
  mockTeachers,
  promotionClasses,
} from "@/constants/admin/mock.constants";
import type { TermStatus } from "@/types/session.types";
import { useSessions } from "@/hooks/sessions.hooks";
import { usePromotionStore } from "@/store/promotion.store";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

const termBar: Record<TermStatus, string> = {
  closed: "bg-ink/15",
  active: "bg-brand",
  upcoming: "border border-dashed border-muted/40",
};

export default function AdminDashboard() {
  const promotedCount = usePromotionStore((s) => s.promotedClasses.length);
  const { data: sessions = [] } = useSessions();
  const currentSession = sessions.find((s) => s.isCurrent);
  const activeTerm = currentSession?.terms.find((t) => t.status === "active");
  const sessionEnded =
    !!currentSession && !activeTerm && currentSession.terms.at(-1)?.status === "closed";

  const activeStudents = mockStudents.filter((s) => s.status === "active").length;
  const activeTeachers = mockTeachers.filter((t) => t.isActive);
  const classesWithoutTeacher = promotionClasses.filter(
    (c) => !activeTeachers.some((t) => t.className === c),
  ).length;

  // TODO: drive from the backend once promotion progress is stored.
  const steps = [
    { label: "Close the 3rd term", hint: "Locks results so they can't be edited", done: sessionEnded, href: "/portal/admin/sessions" },
    { label: "Write V.P's remarks", hint: "One remark per student, per class", done: false, href: "/portal/admin/remarks" },
    { label: "Promote students", hint: `${promotedCount} of ${promotionClasses.length} classes done`, done: promotedCount === promotionClasses.length, href: "/portal/admin/promotion" },
    { label: "Start the new session", hint: "Students move to their new classes", done: false, href: "/portal/admin/sessions" },
    { label: "Assign class teachers", hint: `${classesWithoutTeacher} class${classesWithoutTeacher === 1 ? "" : "es"} without a teacher`, done: false, href: "/portal/admin/teachers" },
  ];

  const facts = [
    { label: "Active students", value: activeStudents, href: "/portal/admin/students" },
    { label: "Teachers", value: activeTeachers.length, href: "/portal/admin/teachers" },
    { label: "Classes", value: promotionClasses.length, href: "/portal/admin/promotion" },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Session overview */}
      <section className={`${panelClass} p-6`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-sm text-muted">Current session</p>
            <h1 className="text-3xl font-bold text-ink tracking-tight mt-0.5">
              {currentSession?.name ?? "None"}
            </h1>
            <p className="text-sm mt-1">
              {activeTerm ? (
                <span className="text-brand font-medium">{activeTerm.name} is in progress</span>
              ) : sessionEnded ? (
                <span className="text-clay font-medium">
                  All terms are closed. The session has ended.
                </span>
              ) : (
                <span className="text-muted">No active term</span>
              )}
            </p>
          </div>
          {sessionEnded && (
            <Link href="/portal/admin/promotion" className={`${primaryButton} self-start`}>
              Start promotion <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Term timeline */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          {currentSession?.terms.map((t) => (
            <div key={t.id}>
              <div className={`h-2 rounded-full ${termBar[t.status]}`} />
              <p className="text-sm font-medium text-ink mt-2">{t.name}</p>
              <p className="text-xs text-muted tabular-nums">
                {formatDate(t.startDate)} – {formatDate(t.endDate)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-6 items-start">
        {/* Steps */}
        <section className={panelClass}>
          <header className="px-6 py-4 border-b border-line">
            <h2 className="font-semibold text-ink">Before the new session</h2>
          </header>
          <ol>
            {steps.map((step, i) => (
              <li key={step.label} className="border-b border-line last:border-0">
                <Link
                  href={step.href}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-canvas transition-colors group"
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                      step.done ? "bg-brand text-white" : "bg-tint text-brand"
                    }`}
                  >
                    {step.done ? <Check size={14} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className={`block text-sm font-medium ${step.done ? "text-muted line-through" : "text-ink"}`}>
                      {step.label}
                    </span>
                    <span className="block text-xs text-muted mt-0.5">{step.hint}</span>
                  </span>
                  <ArrowRight size={16} className="text-muted/40 group-hover:text-brand transition-colors" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* At a glance */}
        <section className={panelClass}>
          <header className="px-5 py-4 border-b border-line">
            <h2 className="font-semibold text-ink">At a glance</h2>
          </header>
          <dl>
            {facts.map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className="flex items-baseline justify-between px-5 py-3.5 border-b border-line last:border-0 hover:bg-canvas transition-colors"
              >
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="text-xl font-bold text-ink tabular-nums">{f.value}</dd>
              </Link>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
