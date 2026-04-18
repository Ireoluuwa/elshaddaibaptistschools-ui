"use client";

import React, { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";

export default function StudentPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-[#0e2e1d] text-lg font-bold mb-1">Change Password</h2>
        <p className="text-gray-400 text-xs">Ensure your account is using a secure and private password.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5 flex-1">
        <div className="flex flex-col gap-4">
          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">New Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-11 pl-11 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
                placeholder="New password"
              />
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Confirm New Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-11 pl-11 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 mt-auto">
          <button
            type="submit"
            className="h-11 px-6 bg-[#0e2e1d] hover:bg-[#0a2118] text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 min-w-[170px]"
          >
            {isSaved ? (
              <>
                <CheckCircle2 size={18} className="mr-2 text-emerald-400" />
                Password Updated
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
