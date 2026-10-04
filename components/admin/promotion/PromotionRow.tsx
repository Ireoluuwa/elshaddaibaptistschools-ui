"use client";

import React from "react";
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

const selectedStyle: Record<PromotionDecision, string> = {
  promote: "bg-brand text-white",
  graduate: "bg-brand text-white",
  repeat: "bg-clay text-white",
  withdraw: "bg-ink text-white",
};

export const rowGrid =
  "grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,1fr)_110px_auto] items-center gap-x-4 gap-y-3";

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
  const options: PromotionDecision[] = [isFinalClass ? "graduate" : "promote", "repeat", "withdraw"];
  const showDepartment = needsDepartment && value.decision === "promote";

  return (
    <li className={`${rowGrid} px-5 py-3.5`}>
      {/* Student */}
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink truncate">
          {student.lastName} {student.firstName}
        </p>
        <p className="text-xs text-muted tabular-nums">{student.username}</p>
      </div>

      {/* Average */}
      <div className="text-right sm:text-left">
        {avg === null ? (
          <span className="text-xs text-clay">No result</span>
        ) : (
          <div className="flex flex-col sm:gap-1">
            <span className={`text-sm font-semibold tabular-nums ${belowPass ? "text-clay" : "text-ink"}`}>
              {avg.toFixed(1)}
            </span>
            <span className="hidden sm:block h-1 w-20 rounded-full bg-tint overflow-hidden">
              <span
                className={`block h-full rounded-full ${belowPass ? "bg-clay" : "bg-brand"}`}
                style={{ width: `${avg}%` }}
              />
            </span>
          </div>
        )}
      </div>

      {/* Decision */}
      <div className="col-span-2 sm:col-span-1 flex flex-wrap items-center gap-2 sm:justify-end">
        <div className="inline-flex rounded-lg border border-line p-0.5 bg-white">
          {options.map((opt) => (
            <button
              key={opt}
              disabled={locked}
              onClick={() => onChange({ ...value, decision: opt })}
              className={`h-7 px-2.5 rounded-md text-xs font-semibold capitalize transition-colors disabled:cursor-default ${
                value.decision === opt ? selectedStyle[opt] : "text-muted hover:text-ink"
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
            className={`h-8 px-2 rounded-lg border text-xs outline-none bg-white ${
              value.department ? "border-line text-ink" : "border-clay text-clay"
            }`}
          >
            <option value="" disabled>
              Department
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
