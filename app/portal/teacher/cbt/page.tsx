"use client";

import React from "react";
import Link from "next/link";
import { Monitor, ArrowLeft } from "lucide-react";

export default function CBTPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-100 shadow-sm text-center max-w-md w-full">
        <div className="w-16 h-16 bg-[#f0f7f4] rounded-2xl flex items-center justify-center text-[#006442] mx-auto mb-6">
          <Monitor size={32} />
        </div>
        
        <h1 className="text-2xl font-black text-[#0e2e1d] mb-1 uppercase tracking-tight">
          CBT Portal
        </h1>
        <p className="text-[#006442] font-bold text-[10px] uppercase tracking-[0.2em] mb-4 bg-[#f0f7f4] inline-block px-3 py-1 rounded-full">
          Coming Soon
        </p>
        
        <p className="text-gray-400 text-sm mb-10 leading-relaxed">
          The Computer Based Testing module is under development and will be available to teachers shortly.
        </p>

        <Link
          href="/portal/teacher"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 h-12 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={16} />
          Return to Dashboard
        </Link>
      </div>

      <footer className="mt-12 text-center text-gray-400 text-[11px] font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Teacher Portal.
      </footer>
    </div>
  );
}
