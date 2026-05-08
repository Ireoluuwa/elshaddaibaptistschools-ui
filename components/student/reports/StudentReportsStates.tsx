"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export function ReportsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 bg-gray-200 rounded-lg" />
        <div className="h-4 w-72 bg-gray-100 rounded-lg" />
      </div>
      <div className="flex gap-3">
        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
        <div className="h-10 w-40 bg-gray-200 rounded-xl" />
      </div>
      <div className="mt-4 flex flex-col gap-6">
        <div className="h-4 w-24 bg-gray-100 rounded" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100" />
              <div className="h-2 w-12 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
        <Loader2 size={32} className="animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Something went wrong</h2>
      <p className="text-gray-500 max-w-sm">
        We couldn't load your reports. Please try refreshing the page or contact support if the issue persists.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-[#006442] text-white rounded-xl text-sm font-bold"
      >
        Retry
      </button>
    </div>
  );
}
