"use client";

import React, { useState } from "react";
import { UserPlus, CheckCircle2, Lock, Eye, EyeOff } from "lucide-react";
import { classrooms } from "@/constants/teacher/students.constants";

const ManualEntry = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const defaultPassword = "1234";

  const canSubmit =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    username.trim() !== "" &&
    selectedClass !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setFirstName("");
      setLastName("");
      setUsername("");
      setSelectedClass("");
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Section Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#006442] rounded-full" />
          Personal Information
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              First Name
            </label>
            <input
              type="text"
              placeholder="e.g. Julian"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all placeholder:text-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Last Name
            </label>
            <input
              type="text"
              placeholder="e.g. Barnes"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Username & Password Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. j.barnes2024"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all placeholder:text-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
              Password
              <Lock size={12} className="text-gray-300" />
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={defaultPassword}
                disabled
                className="w-full h-11 px-4 pr-10 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 text-sm cursor-not-allowed font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <span className="text-[11px] text-gray-300 font-medium">
              Default password — student can change later
            </span>
          </div>
        </div>

        {/* Class Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Class Selection
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full sm:w-1/2 h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-all cursor-pointer font-medium text-gray-600"
          >
            <option value="" disabled>
              Select a classroom...
            </option>
            {classrooms.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 mt-2 border-t border-gray-100">
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-11 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaved ? (
              <>
                <CheckCircle2 size={18} />
                Student Added!
              </>
            ) : (
              <>
                <UserPlus size={16} />
                Add Student
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualEntry;
