"use client";

import React from "react";
import Link from "next/link";
import { DashboardAction } from "@/constants/teacher/dashboard.constants";

interface ActionCardProps {
  action: DashboardAction;
}

const ActionCard: React.FC<ActionCardProps> = ({ action }) => {
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
};

export default ActionCard;
