"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpCircle,
  CalendarPlus,
  CheckCircle2,
  Circle,
  GraduationCap,
  Layers,
  UserPlus,
  Users,
} from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import {
  mockSessions,
  mockStudents,
  mockTeachers,
  promotionClasses,
} from "@/constants/admin/mock.constants";

export default function AdminDashboard() {
  const currentSession = mockSessions.find((s) => s.isCurrent);
  const activeTerm = currentSession?.terms.find((t) => t.status === "active");
  const lastTerm = currentSession?.terms.at(-1);
  const sessionEnded = !activeTerm && lastTerm?.status === "closed";

  const stats = [
    { label: "Students", value: mockStudents.filter((s) => s.status === "active").length, icon: GraduationCap },
    { label: "Teachers", value: mockTeachers.filter((t) => t.isActive).length, icon: Users },
    { label: "Classes", value: promotionClasses.length, icon: Layers },
  ];

  // TODO: drive from the backend once promotion progress is stored.
  const checklist = [
    { label: "Close the 3rd term", done: lastTerm?.status === "closed", href: "/portal/admin/sessions" },
    { label: "Promote students to their next class", done: false, href: "/portal/admin/promotion" },
    { label: "Start the next session and 1st term", done: false, href: "/portal/admin/sessions" },
    { label: "Assign class teachers for the new session", done: false, href: "/portal/admin/teachers" },
  ];

  const quickActions = [
    { name: "New Session", description: "Open a session & term", href: "/portal/admin/sessions", icon: CalendarPlus },
    { name: "Promote", description: "Move classes up", href: "/portal/admin/promotion", icon: ArrowUpCircle },
    { name: "Add Student", description: "Enroll new students", href: "/portal/admin/students/new", icon: UserPlus },
    { name: "Teachers", description: "Assign classes", href: "/portal/admin/teachers", icon: Users },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Run the school calendar, promotions and accounts."
        action={
          <div className="inline-flex flex-col px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100/50 self-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              Current Session
            </span>
            <span className="text-sm font-semibold">
              {currentSession?.name ?? "None"} •{" "}
              {activeTerm?.name ?? "No active term"}
            </span>
          </div>
        }
      />

      {sessionEnded && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-100">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 self-start">
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-900">
              {currentSession?.name} has ended
            </p>
            <p className="text-sm text-amber-800/70 mt-0.5">
              There&apos;s no active term. Promote students, then start the
              next session.
            </p>
          </div>
          <Link
            href="/portal/admin/promotion"
            className="h-10 px-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shrink-0"
          >
            Start promotion <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <Icon size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {label}
              </span>
            </div>
            <p className="text-secondary text-2xl sm:text-3xl font-black mt-2">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Checklist */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-secondary font-bold">End-of-session checklist</h2>
            <p className="text-gray-400 text-xs mt-0.5">
              Work through these in order to roll over to the new session.
            </p>
          </div>
          <ol className="divide-y divide-gray-100">
            {checklist.map((item, i) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50/60 transition-colors group"
                >
                  {item.done ? (
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  ) : (
                    <Circle size={20} className="text-gray-300 shrink-0" />
                  )}
                  <span
                    className={`flex-1 text-sm ${
                      item.done ? "text-gray-400 line-through" : "text-secondary font-medium"
                    }`}
                  >
                    <span className="text-gray-300 mr-2">{i + 1}.</span>
                    {item.label}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-gray-300 group-hover:text-primary transition-colors"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Quick actions */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3 content-start">
          {quickActions.map(({ name, description, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#006442]/30 hover:shadow-md transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="text-center">
                <p className="text-secondary text-sm font-semibold">{name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="text-center text-gray-400 text-[11px] py-8 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Admin Portal.
      </footer>
    </div>
  );
}
