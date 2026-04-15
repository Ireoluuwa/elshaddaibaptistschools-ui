"use client";

import React from "react";
import Link from "next/link";
import { Monitor } from "lucide-react";
import { cbtCard } from "@/constants/teacher/dashboard.constants";

const CBTCard = () => {
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
      <div className="mt-3 w-full py-2 bg-white/10 group-hover:bg-white/20 rounded-lg text-sm font-semibold transition-all text-center">
        Manage Tests
      </div>
    </Link>
  );
};

export default CBTCard;
