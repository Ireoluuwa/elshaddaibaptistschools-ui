"use client";

import React from "react";
import Link from "next/link";
import { 
  ClipboardList, 
  BarChart3, 
  FileText, 
  User, 
  Monitor,
  LucideIcon
} from "lucide-react";

interface StudentAction {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const studentActions: StudentAction[] = [
  {
    name: "Assignments",
    description: "View class tasks",
    href: "/portal/student/assignments",
    icon: ClipboardList,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    name: "Weekly Reports",
    description: "Track your progress",
    href: "/portal/student/reports",
    icon: BarChart3,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  {
    name: "Results",
    description: "View term results",
    href: "/portal/student/results",
    icon: FileText,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    name: "My Profile",
    description: "Update your info",
    href: "/portal/student/profile",
    icon: User,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
  },
  {
    name: "CBT",
    description: "Take online tests",
    href: "/portal/student/cbt",
    icon: Monitor,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

const StudentActions = () => {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#006442] rounded-full" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {studentActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.name}
              href={action.href}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#006442]/30 hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon size={22} className={action.color} />
              </div>
              <div className="text-center">
                <p className="text-[#0e2e1d] text-sm font-semibold">{action.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default StudentActions;
