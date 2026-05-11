"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Loader2, Search, ChevronDown } from "lucide-react";
import { TestScore } from "../../../../types/report";
import { MappedSubject } from "@/services/academics.service";

interface TestScoresProps {
  testScores: TestScore[];
  setTestScores: (scores: TestScore[]) => void;
  isHistoryView: boolean;
  subjects: MappedSubject[];
  isLoadingSubjects: boolean;
}

interface SubjectDropdownProps {
  value: string;
  subjects: MappedSubject[];
  isLoadingSubjects: boolean;
  isHistoryView: boolean;
  onChange: (val: string) => void;
}

const SubjectDropdown: React.FC<SubjectDropdownProps> = ({
  value,
  subjects,
  isLoadingSubjects,
  isHistoryView,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (isHistoryView) {
    return (
      <div className="w-full h-10 px-3 flex items-center rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-500">
        {value || "—"}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        disabled={isLoadingSubjects}
        onClick={() => setOpen((o) => !o)}
        className="w-full h-10 px-3 flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white hover:border-[#006442] focus:border-[#006442] outline-none text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={value ? "text-[#0e2e1d] truncate" : "text-gray-400"}>
          {isLoadingSubjects ? "Loading subjects…" : (value || "Select subject")}
        </span>
        {isLoadingSubjects
          ? <Loader2 size={14} className="animate-spin text-gray-400 shrink-0" />
          : <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        }
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 bg-gray-50">
            <Search size={13} className="text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search subject…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
            )}
          </div>
          <ul className="max-h-[35vh] md:max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">
                {subjects.length === 0 ? "No subjects for this class" : "No results"}
              </li>
            ) : (
              filtered.map((sub) => (
                <li
                  key={sub.id}
                  onMouseDown={() => { onChange(sub.name); setOpen(false); setSearch(""); }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    value === sub.name
                      ? "bg-[#006442] text-white font-semibold"
                      : "text-[#0e2e1d] hover:bg-[#f0f7f4]"
                  }`}
                >
                  {sub.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export const TestScores: React.FC<TestScoresProps> = ({
  testScores,
  setTestScores,
  isHistoryView,
  subjects,
  isLoadingSubjects,
}) => {
  const hasScores = testScores.length > 0;

  const addTestScore = () => {
    setTestScores([
      ...testScores,
      { id: Date.now(), subject: "", score: "", maxScore: "" },
    ]);
  };

  const removeTestScore = (id: number) => {
    setTestScores(testScores.filter((test) => test.id !== id));
  };

  const updateTestScore = (id: number, field: string, value: string) => {
    setTestScores(
      testScores.map((test) => (test.id === id ? { ...test, [field]: value } : test))
    );
  };

  if (isHistoryView && (!hasScores || testScores[0].subject === "")) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
          Academic Scores (Optional)
        </h3>
        {!isHistoryView && (
          <button
            type="button"
            onClick={addTestScore}
            disabled={isLoadingSubjects}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#006442] bg-[#f0f7f4] hover:bg-[#006442]/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingSubjects ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Add Score
          </button>
        )}
      </div>

      {hasScores && (
        <div className="flex flex-col gap-3">
          {testScores.map((test) => (
            <div
              key={test.id}
              className="flex flex-col gap-3 p-3 md:p-4 border border-gray-100 rounded-xl bg-gray-50/50"
            >
              {/* Card header: label + delete */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Subject</span>
                {!isHistoryView && (
                  <button
                    type="button"
                    onClick={() => removeTestScore(test.id)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              {/* Subject searchable dropdown — full width */}
              <SubjectDropdown
                value={test.subject}
                subjects={subjects}
                isLoadingSubjects={isLoadingSubjects}
                isHistoryView={isHistoryView}
                onChange={(val) => updateTestScore(test.id, "subject", val)}
              />

              {/* Score / Total — labeled 2-col grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-1">Score</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={test.score}
                    onChange={(e) => updateTestScore(test.id, "score", e.target.value)}
                    disabled={isHistoryView}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-1">Total</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={test.maxScore}
                    onChange={(e) => updateTestScore(test.id, "maxScore", e.target.value)}
                    disabled={isHistoryView}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
