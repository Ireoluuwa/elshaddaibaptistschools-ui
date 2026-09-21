"use client";

import React from "react";
import { Percent } from "lucide-react";

interface PercentageInputProps {
  value: string;
  setValue: (value: string) => void;
  isHistoryView: boolean;
}

export const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  setValue,
  isHistoryView,
}) => {
  const numeric = value.trim() === "" ? null : Number(value);
  const isInvalid =
    numeric !== null && (Number.isNaN(numeric) || numeric < 0 || numeric > 100);

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
        Weekly Percentage
      </h3>
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2 bg-white rounded-xl border px-4 py-2.5 w-40 transition-all ${
            isInvalid
              ? "border-red-300 ring-2 ring-red-100"
              : "border-gray-200 focus-within:border-[#006442] focus-within:ring-2 focus-within:ring-[#006442]/10"
          }`}
        >
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step={0.01}
            placeholder="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isHistoryView}
            className="flex-1 min-w-0 bg-transparent text-lg font-bold text-gray-800 outline-none disabled:text-gray-500 placeholder:text-gray-300"
          />
          <Percent size={18} className="text-[#006442] shrink-0" />
        </div>
        <p className="text-xs text-gray-400 font-medium">
          {isInvalid
            ? "Enter a value between 0 and 100."
            : "Overall performance for the week (0 – 100)."}
        </p>
      </div>
    </div>
  );
};
