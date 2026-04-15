"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReportFormProps, TestScore } from "../../../../types/report";
import { ReportHeader } from "./ReportHeader";
import { BehavioralRating } from "./BehavioralRating";
import { TeacherComments } from "./TeacherComments";
import { TestScores } from "./TestScores";

export default function ReportForm({
  student,
  isHistoryView = false,
  initialData,
}: ReportFormProps) {
  const router = useRouter();

  // Initialize state based on history data if it exists, otherwise default empty
  const [rating, setRating] = useState<number>(initialData?.rating || 0);
  const [description, setDescription] = useState(initialData?.description || "");
  const [testScores, setTestScores] = useState<TestScore[]>(
    initialData?.testScores && initialData.testScores.length > 0
      ? initialData.testScores
      : [{ id: Date.now(), subject: "", score: "", maxScore: "" }]
  );

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      router.push("/portal/teacher/reports");
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <ReportHeader student={student} />

      <form onSubmit={handleSave} className="p-6 flex flex-col gap-8">
        <BehavioralRating
          rating={rating}
          setRating={setRating}
          isHistoryView={isHistoryView}
        />

        <TeacherComments
          student={student}
          description={description}
          setDescription={setDescription}
          isHistoryView={isHistoryView}
        />

        <TestScores
          testScores={testScores}
          setTestScores={setTestScores}
          isHistoryView={isHistoryView}
        />

        {/* Form Actions */}
        {!isHistoryView && (
          <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={rating === 0}
              className="h-11 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 size={18} className="mr-2" />
                  Saved Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
