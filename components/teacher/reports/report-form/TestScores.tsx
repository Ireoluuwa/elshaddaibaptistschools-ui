"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { availableSubjects } from "@/constants/teacher/reports.constants";
import { TestScore } from "./types";

interface TestScoresProps {
  testScores: TestScore[];
  setTestScores: (scores: TestScore[]) => void;
  isHistoryView: boolean;
}

export const TestScores: React.FC<TestScoresProps> = ({
  testScores,
  setTestScores,
  isHistoryView,
}) => {
  const addTestScore = () => {
    setTestScores([
      ...testScores,
      { id: Date.now(), subject: "", score: "", maxScore: "" },
    ]);
  };

  const removeTestScore = (id: number) => {
    if (testScores.length > 1) {
      setTestScores(testScores.filter((test) => test.id !== id));
    }
  };

  const updateTestScore = (id: number, field: string, value: string) => {
    setTestScores(
      testScores.map((test) => {
        if (test.id === id) {
          return { ...test, [field]: value };
        }
        return test;
      })
    );
  };

  const showScores =
    testScores.length > 0 && (testScores[0].subject !== "" || !isHistoryView);

  if (!showScores && isHistoryView) return null;

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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#006442] bg-[#f0f7f4] hover:bg-[#006442]/10 rounded-lg transition-all"
          >
            <Plus size={14} /> Add Score
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {testScores.map((test) => (
          <div
            key={test.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50"
          >
            <div className="flex-1 w-full relative">
              <select
                value={test.subject}
                onChange={(e) =>
                  updateTestScore(test.id, "subject", e.target.value)
                }
                disabled={isHistoryView}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-24 relative">
                <input
                  type="number"
                  placeholder="Score"
                  value={test.score}
                  onChange={(e) =>
                    updateTestScore(test.id, "score", e.target.value)
                  }
                  disabled={isHistoryView}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
              <span className="text-gray-400 font-medium">/</span>
              <div className="w-24 relative">
                <input
                  type="number"
                  placeholder="Total"
                  value={test.maxScore}
                  onChange={(e) =>
                    updateTestScore(test.id, "maxScore", e.target.value)
                  }
                  disabled={isHistoryView}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
            </div>

            {!isHistoryView && (
              <button
                type="button"
                onClick={() => removeTestScore(test.id)}
                disabled={testScores.length === 1}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto sm:ml-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
