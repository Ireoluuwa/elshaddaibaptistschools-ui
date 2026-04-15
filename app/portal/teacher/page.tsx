"use client";

import Link from "next/link";
import { Download, Plus, Monitor } from "lucide-react";
import {
  classroomActions,
  profileActions,
  cbtCard,
  DashboardAction,
} from "@/constants/teacher/dashboard.constants";

function ActionCard({ action }: { action: DashboardAction }) {
  const Icon = action.icon;

  return (
    <Link
      href={action.href}
      className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#006442]/30 hover:shadow-md transition-all group"
    >
      <div
        className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
      >
        <Icon size={22} className={action.color} />
      </div>
      <div className="text-center">
        <p className="text-[#0e2e1d] text-sm font-semibold">{action.name}</p>
        <p className="text-gray-400 text-xs mt-0.5">{action.description}</p>
      </div>
    </Link>
  );
}

function CBTCard() {
  return (
    <Link
      href={cbtCard.href}
      className="flex flex-col justify-between p-6 bg-[#0e2e1d] rounded-2xl text-white hover:bg-[#0a2518] transition-all group col-span-2 sm:col-span-1 min-h-[160px]"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-white/15 px-2.5 py-1 rounded-full">
          Live Now
        </span>
        <Monitor size={18} className="text-white/50" />
      </div>
      <div className="mt-auto">
        <h3 className="text-xl font-black tracking-tight">{cbtCard.name}</h3>
        <p className="text-white/50 text-xs mt-0.5">{cbtCard.description}</p>
        <p className="text-white/40 text-[11px]">{cbtCard.subtitle}</p>
      </div>
      <button className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-all">
        Manage Tests
      </button>
    </Link>
  );
}

export default function TeacherDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight">
            Teacher Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your classroom, students, and curriculum efficiently.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-[#0e2e1d] transition-all">
            <Download size={16} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold transition-all shadow-sm">
            <Plus size={16} />
            New Class
          </button>
        </div>
      </div>

      {/* Classroom Actions */}
      <section className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#006442] rounded-full" />
          Classroom Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {classroomActions.map((action) => (
            <ActionCard key={action.name} action={action} />
          ))}
        </div>
      </section>

      {/* Performance & Profile */}
      <section className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#006442] rounded-full" />
          Performance & Profile
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {profileActions.map((action) => (
            <ActionCard key={action.name} action={action} />
          ))}
          <CBTCard />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-300 text-xs py-6 border-t border-gray-100">
        &copy; {new Date().getFullYear()} EduPortal Teacher System. All rights
        reserved.
      </footer>
    </div>
  );
}
