"use client";

import React, { useState } from "react";
import { Plus, CheckCircle2, CalendarDays } from "lucide-react";
import { ResultScore } from "@/constants/teacher/results.constants";
import ScoreEntry from "./ScoreEntry";

interface ResultFormProps {
  isReadOnly: boolean;
  initialScores?: ResultScore[];
  initialDaysAttended?: string;
  initialTotalDays?: string;
}

export default function ResultForm({
  isReadOnly,
  initialScores,
  initialDaysAttended,
  initialTotalDays,
}: ResultFormProps) {
  const [scores, setScores] = useState<ResultScore[]>(
    initialScores && initialScores.length > 0
      ? initialScores
      : [{ id: Date.now(), subject: "", test1: "", test2: "", exam: "" }]
  );
  const [daysAttended, setDaysAttended] = useState(initialDaysAttended || "");
  const [totalDays, setTotalDays] = useState(initialTotalDays || "65");
  const [isSaved, setIsSaved] = useState(false);

  const addScore = () => {
    setScores([
      ...scores,
      { id: Date.now(), subject: "", test1: "", test2: "", exam: "" },
    ]);
  };

  const removeScore = (id: number) => {
    if (scores.length > 1) {
      setScores(scores.filter((s) => s.id !== id));
    }
  };

  const updateScore = (id: number, field: string, value: string) => {
    setScores(
      scores.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Scores Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#006442] rounded-full" />
            Subject Scores
          </h2>
          {!isReadOnly && (
            <button
              type="button"
              onClick={addScore}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#006442] bg-[#f0f7f4] hover:bg-[#006442]/10 rounded-lg transition-all"
            >
              <Plus size={14} /> Add Score
            </button>
          )}
        </div>

        <div className="p-5 flex flex-col gap-3">
          {/* Column Headers (desktop) */}
          <div className="hidden sm:flex items-center gap-3 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <div className="flex-1">Subject</div>
            <div className="flex items-center gap-2">
              <div className="w-20 text-center">Test 1</div>
              <div className="w-20 text-center">Test 2</div>
              <div className="w-20 text-center">Exam</div>
              <div className="w-16 text-center">Total</div>
              <div className="w-14 text-center">Grade</div>
            </div>
            {!isReadOnly && <div className="w-10" />}
          </div>

          {scores.map((score) => (
            <ScoreEntry
              key={score.id}
              score={score}
              onUpdate={updateScore}
              onRemove={removeScore}
              canRemove={scores.length > 1}
              isReadOnly={isReadOnly}
            />
          ))}
        </div>
      </div>

      {/* Attendance Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#006442] rounded-full" />
            Attendance Record
          </h2>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4">
            <CalendarDays size={18} className="text-gray-400 shrink-0" />
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Days Present
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={daysAttended}
                  onChange={(e) => setDaysAttended(e.target.value)}
                  disabled={isReadOnly}
                  className="w-24 h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
              <span className="text-gray-300 font-medium mt-5">/</span>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Total Days
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={totalDays}
                  onChange={(e) => setTotalDays(e.target.value)}
                  disabled={isReadOnly}
                  className="w-24 h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      {!isReadOnly && (
        <div className="flex justify-end">
          <button
            type="submit"
            className="h-11 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            {isSaved ? (
              <>
                <CheckCircle2 size={18} />
                Result Saved!
              </>
            ) : (
              "Save Result"
            )}
          </button>
        </div>
      )}
    </form>
  );
}
