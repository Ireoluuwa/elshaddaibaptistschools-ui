"use client";

import React from "react";
import { Monitor } from "lucide-react";

export default function CBTComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <Monitor size={32} className="text-[#006442] opacity-40" />
      </div>
      
      <h1 className="text-[#0e2e1d] text-2xl font-black uppercase tracking-widest mb-2">
        CBT Portal
      </h1>
      
      <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] max-w-xs">
        Coming Soon
      </p>
      
      <div className="mt-8 flex gap-1">
        <div className="w-1 h-1 rounded-full bg-emerald-200 animate-bounce [animation-delay:-0.3s]" />
        <div className="w-1 h-1 rounded-full bg-emerald-200 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-1 h-1 rounded-full bg-emerald-200 animate-bounce" />
      </div>

      <footer className="fixed bottom-12 left-0 right-0 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
        &copy; {new Date().getFullYear()} El-Shaddai Schools
      </footer>
    </div>
  );
}
