"use client";

import React, { useState, useEffect } from "react";
import { Plus, CheckCircle2, CalendarDays, Send, AlertCircle } from "lucide-react";
import { ResultScore } from "@/constants/teacher/results.constants";
import { useUpsertResult } from "@/hooks/result.hooks";
import { TerminalResultScore } from "@/types/result";
import { toast } from "@/store/toast.store";
import ScoreEntry from "./ScoreEntry";

interface ResultFormProps {
  studentId: string;
  termId: string;
  subjects: string[];
  isReadOnly: boolean;
  initialScores?: TerminalResultScore[];
  initialDaysAttended?: number;
  initialTotalDays?: number;
  onSaved?: () => void;
}

function buildInitialScores(subjects: string[], initial?: TerminalResultScore[]): ResultScore[] {
  if (initial && initial.length > 0) {
    return initial.map((s, i) => ({
      id: i + 1,
      subject: s.subjectName,
      test1: String(s.test1),
      test2: String(s.test2),
      exam: String(s.exam),
    }));
  }
  if (subjects.length > 0) {
    return subjects.map((name, i) => ({
      id: i + 1,
      subject: name,
      test1: "",
      test2: "",
      exam: "",
    }));
  }
  return [{ id: Date.now(), subject: "", test1: "", test2: "", exam: "" }];
}

export default function ResultForm({
  studentId,
  termId,
  subjects,
  isReadOnly,
  initialScores,
  initialDaysAttended,
  initialTotalDays,
  onSaved,
}: ResultFormProps) {
  const [scores, setScores] = useState<ResultScore[]>(() =>
    buildInitialScores(subjects, initialScores)
  );
  const [daysAttended, setDaysAttended] = useState(
    initialDaysAttended !== undefined ? String(initialDaysAttended) : ""
  );
  const [totalDays, setTotalDays] = useState(
    initialTotalDays !== undefined ? String(initialTotalDays) : "65"
  );

  const { mutate: upsertResult, isPending, isError, error } = useUpsertResult();

  // Re-sync when subjects or initial data changes (e.g. switching terms)
  useEffect(() => {
    setScores(buildInitialScores(subjects, initialScores));
    setDaysAttended(initialDaysAttended !== undefined ? String(initialDaysAttended) : "");
    setTotalDays(initialTotalDays !== undefined ? String(initialTotalDays) : "65");
  }, [studentId, termId]);

  const addScore = () => {
    setScores([...scores, { id: Date.now(), subject: "", test1: "", test2: "", exam: "" }]);
  };

  const removeScore = (id: number) => {
    if (scores.length > 1) setScores(scores.filter((s) => s.id !== id));
  };

  const updateScore = (id: number, field: string, value: string) => {
    setScores(scores.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const buildPayload = (status: "DRAFT" | "PUBLISHED") => ({
    studentId,
    termId,
    scores: scores.map((s) => ({
      subjectName: s.subject,
      test1: Number(s.test1) || 0,
      test2: Number(s.test2) || 0,
      exam: Number(s.exam) || 0,
    })),
    daysAttended: Number(daysAttended) || 0,
    totalDays: Number(totalDays) || 65,
    status,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    upsertResult(buildPayload("DRAFT"), {
      onSuccess: () => {
        toast.success("Draft saved", "Result has been saved as a draft.");
        onSaved?.();
      },
      onError: () => toast.error("Save failed", "Could not save the result. Please try again."),
    });
  };

  const handlePublish = () => {
    upsertResult(buildPayload("PUBLISHED"), {
      onSuccess: () => {
        toast.success("Result published", "The result is now visible to the student.");
        onSaved?.();
      },
      onError: () => toast.error("Publish failed", "Could not publish the result. Please try again."),
    });
  };

  const errorMessage =
    isError && error instanceof Error ? error.message : null;

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6">
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
          {/* Column Headers */}
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
              availableSubjects={subjects}
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

      {/* Error Banner */}
      {errorMessage && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 font-medium">
          <AlertCircle size={16} className="shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* Submit Buttons */}
      {!isReadOnly && (
        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="h-11 px-8 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-60"
          >
            {isPending ? (
              "Saving..."
            ) : (
              <>
                <CheckCircle2 size={16} />
                Save Draft
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPending}
            className="h-11 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-60"
          >
            <Send size={16} />
            Publish Result
          </button>
        </div>
      )}
    </form>
  );
}
