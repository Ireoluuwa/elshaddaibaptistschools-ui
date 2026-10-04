"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { departments } from "@/constants/admin/mock.constants";
import type { AdminStudent, PromotionDecision } from "@/types/admin.types";

export interface RowDecision {
  decision: PromotionDecision;
  department?: string;
}

interface PromotionRowProps {
  student: AdminStudent;
  value: RowDecision;
  onChange: (value: RowDecision) => void;
  passMark: number;
  isFinalClass: boolean;
  needsDepartment: boolean;
  locked: boolean;
}

const decisionStyles: Record<PromotionDecision, string> = {
  promote: "bg-emerald-600 text-white",
  graduate: "bg-emerald-600 text-white",
  repeat: "bg-amber-500 text-white",
  withdraw: "bg-gray-500 text-white",
};

const PromotionRow: React.FC<PromotionRowProps> = ({
  student,
  value,
  onChange,
  passMark,
  isFinalClass,
  needsDepartment,
  locked,
}) => {
  const avg = student.annualAverage;
  const belowPass = avg !== null && avg < passMark;
  const options: PromotionDecision[] = [
    isFinalClass ? "graduate" : "promote",
    "repeat",
    "withdraw",
  ];
  const showDepartment = needsDepartment && value.decision === "promote";

  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-3 px-6 py-4">
      {/* Student */}
      <div className="flex items-center gap-3 flex-1 min-w-[200px]">
        <div className="w-9 h-9 rounded-full bg-emerald-50 text-primary flex items-center justify-center text-xs font-bold shrink-0">
          {student.firstName[0]}
          {student.lastName[0]}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-secondary truncate">
            {student.lastName} {student.firstName}
          </p>
          <p className="text-xs text-gray-400 font-mono">{student.username}</p>
        </div>
      </div>

      {/* Average */}
      <div className="w-24 text-right sm:text-left">
        {avg === null ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
            <AlertTriangle size={12} /> No results
          </span>
        ) : (
          <span
            className={`text-sm font-bold ${belowPass ? "text-red-500" : "text-secondary"}`}
          >
            {avg.toFixed(1)}%
          </span>
        )}
        <p className="text-[10px] uppercase tracking-wider text-gray-400">Annual avg</p>
      </div>

      {/* Decision */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="inline-flex p-0.5 rounded-lg bg-gray-100">
          {options.map((opt) => (
            <button
              key={opt}
              disabled={locked}
              onClick={() => onChange({ ...value, decision: opt })}
              className={`px-3 h-8 rounded-md text-xs font-semibold capitalize transition-all disabled:cursor-not-allowed ${
                value.decision === opt
                  ? decisionStyles[opt]
                  : "text-gray-500 hover:text-secondary"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {showDepartment && (
          <select
            disabled={locked}
            value={value.department ?? ""}
            onChange={(e) => onChange({ ...value, department: e.target.value })}
            className={`h-9 px-2 rounded-lg border text-xs outline-none bg-white ${
              value.department ? "border-gray-200" : "border-amber-300 text-amber-700"
            }`}
          >
            <option value="" disabled>
              Department…
            </option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        )}
      </div>
    </li>
  );
};

export default PromotionRow;
