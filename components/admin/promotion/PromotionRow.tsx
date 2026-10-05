"use client";

import React from "react";
import type { Department } from "@/types/curriculum.types";
import type { PromotionOutcome, PromotionStudent } from "@/types/promotions.types";

export interface RowDecision {
  outcome: PromotionOutcome;
  departmentId?: string;
}

interface PromotionRowProps {
  student: PromotionStudent;
  value: RowDecision;
  onChange: (value: RowDecision) => void;
  passMark: number;
  isFinalClass: boolean;
  needsDepartment: boolean;
  departments: Department[];
  locked: boolean;
}

const optionLabel: Record<PromotionOutcome, string> = {
  promoted: "Promote",
  graduated: "Graduate",
  repeated: "Repeat",
  withdrawn: "Withdraw",
};

const selectedStyle: Record<PromotionOutcome, string> = {
  promoted: "bg-brand text-white",
  graduated: "bg-brand text-white",
  repeated: "bg-clay text-white",
  withdrawn: "bg-ink text-white",
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
  departments,
  locked,
}) => {
  const avg = student.average;
  const belowPass = avg !== null && avg < passMark;
  const options: PromotionOutcome[] = [isFinalClass ? "graduated" : "promoted", "repeated", "withdrawn"];
  const showDepartment = needsDepartment && value.outcome === "promoted";

  return (
    <li className={`${rowGrid} px-5 py-3.5`}>
      {/* Student */}
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink truncate">
          {student.lastName} {student.firstName}
        </p>
        <p className="text-xs text-muted tabular-nums">
          {student.username}
          {student.department && ` · ${student.department}`}
        </p>
      </div>

      {/* Average */}
      <div className="text-right sm:text-left">
        {avg === null ? (
          <span className="text-xs text-clay">No results</span>
        ) : (
          <div className="flex flex-col sm:gap-1">
            <span className={`text-sm font-semibold tabular-nums ${belowPass ? "text-clay" : "text-ink"}`}>
              {avg.toFixed(1)}
              <span className="text-[10px] font-normal text-muted ml-1">
                {student.termsCounted} term{student.termsCounted === 1 ? "" : "s"}
              </span>
            </span>
            <span className="hidden sm:block h-1 w-20 rounded-full bg-tint overflow-hidden">
              <span
                className={`block h-full rounded-full ${belowPass ? "bg-clay" : "bg-brand"}`}
                style={{ width: `${Math.min(avg, 100)}%` }}
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
              onClick={() => onChange({ ...value, outcome: opt })}
              className={`h-7 px-2.5 rounded-md text-xs font-semibold transition-colors disabled:cursor-default ${
                value.outcome === opt ? selectedStyle[opt] : "text-muted hover:text-ink"
              }`}
            >
              {optionLabel[opt]}
            </button>
          ))}
        </div>

        {showDepartment && (
          <select
            disabled={locked}
            value={value.departmentId ?? ""}
            onChange={(e) => onChange({ ...value, departmentId: e.target.value })}
            aria-label={`Department for ${student.firstName}`}
            className={`h-8 px-2 rounded-lg border text-xs outline-none bg-white ${
              value.departmentId ? "border-line text-ink" : "border-clay text-clay"
            }`}
          >
            <option value="" disabled>
              Department
            </option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </li>
  );
};

export default PromotionRow;
