"use client";

import React, { useState, useRef, useEffect } from "react";
import { Trash2, Search } from "lucide-react";
import {
  resultSubjects,
  gradeMap,
  ResultScore,
} from "@/constants/teacher/results.constants";

interface ScoreEntryProps {
  score: ResultScore;
  onUpdate: (id: number, field: string, value: string) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
  isReadOnly: boolean;
}

const ScoreEntry: React.FC<ScoreEntryProps> = ({
  score,
  onUpdate,
  onRemove,
  canRemove,
  isReadOnly,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [subjectSearch, setSubjectSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const test1 = parseInt(score.test1) || 0;
  const test2 = parseInt(score.test2) || 0;
  const exam = parseInt(score.exam) || 0;
  const total = test1 + test2 + exam;
  const { grade, remark } = gradeMap(total);

  const filteredSubjects = resultSubjects.filter((s) =>
    s.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const gradeColor =
    grade === "A"
      ? "text-emerald-600 bg-emerald-50"
      : grade === "B"
      ? "text-blue-600 bg-blue-50"
      : grade === "C"
      ? "text-yellow-600 bg-yellow-50"
      : grade === "D"
      ? "text-orange-600 bg-orange-50"
      : "text-red-600 bg-red-50";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
      {/* Subject Dropdown with Search */}
      <div className="flex-1 w-full relative" ref={dropdownRef}>
        {isReadOnly ? (
          <div className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-500 flex items-center">
            {score.subject || "—"}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-left flex items-center justify-between hover:border-gray-300 transition-all"
            >
              <span
                className={score.subject ? "text-gray-700" : "text-gray-400"}
              >
                {score.subject || "Select Subject"}
              </span>
              <Search size={14} className="text-gray-400" />
            </button>

            {searchOpen && (
              <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                <div className="p-2 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Search subjects..."
                    value={subjectSearch}
                    onChange={(e) => setSubjectSearch(e.target.value)}
                    autoFocus
                    className="w-full h-8 px-3 rounded-md border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#006442] transition-all"
                  />
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          onUpdate(score.id, "subject", sub);
                          setSearchOpen(false);
                          setSubjectSearch("");
                        }}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                          score.subject === sub
                            ? "font-semibold text-[#006442] bg-[#f0f7f4]"
                            : "text-gray-600"
                        }`}
                      >
                        {sub}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-xs text-gray-400 text-center">
                      No subjects found
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Score Inputs */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="w-20">
          <input
            type="number"
            placeholder="T1"
            min="0"
            max="15"
            value={score.test1}
            onChange={(e) => onUpdate(score.id, "test1", e.target.value)}
            disabled={isReadOnly}
            className="w-full h-10 px-2 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
          />
          <span className="text-[10px] text-gray-400 block text-center mt-0.5">
            /15
          </span>
        </div>

        <div className="w-20">
          <input
            type="number"
            placeholder="T2"
            min="0"
            max="15"
            value={score.test2}
            onChange={(e) => onUpdate(score.id, "test2", e.target.value)}
            disabled={isReadOnly}
            className="w-full h-10 px-2 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
          />
          <span className="text-[10px] text-gray-400 block text-center mt-0.5">
            /15
          </span>
        </div>

        <div className="w-20">
          <input
            type="number"
            placeholder="Exam"
            min="0"
            max="70"
            value={score.exam}
            onChange={(e) => onUpdate(score.id, "exam", e.target.value)}
            disabled={isReadOnly}
            className="w-full h-10 px-2 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
          />
          <span className="text-[10px] text-gray-400 block text-center mt-0.5">
            /70
          </span>
        </div>

        {/* Total (auto) */}
        <div className="w-16 text-center">
          <div className="h-10 flex items-center justify-center rounded-lg bg-gray-100 border border-gray-200 text-sm font-bold text-[#0e2e1d]">
            {total}
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">/100</span>
        </div>

        {/* Grade (auto) */}
        <div className="w-14 text-center">
          <div
            className={`h-10 flex items-center justify-center rounded-lg text-sm font-black ${gradeColor}`}
          >
            {total > 0 ? grade : "—"}
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">Grade</span>
        </div>
      </div>

      {/* Remove Button */}
      {!isReadOnly && (
        <button
          type="button"
          onClick={() => onRemove(score.id)}
          disabled={!canRemove}
          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto sm:ml-0 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
};

export default ScoreEntry;
