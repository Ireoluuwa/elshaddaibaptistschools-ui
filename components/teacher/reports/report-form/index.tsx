"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReportFormProps, TestScore } from "../../../../types/report";
import { ReportHeader } from "./ReportHeader";
import { BehavioralRating } from "./BehavioralRating";
import { TeacherComments } from "./TeacherComments";
import { TestScores } from "./TestScores";
import { useMappedSubjects } from "@/hooks/academics.hooks";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useSubmitReport } from "@/hooks/report.hooks";
import { toast } from "@/store/toast.store";

export default function ReportForm({
  student,
  classId,
  departmentId,
  termId,
  weekNumber,
  isHistoryView = false,
  initialData,
}: ReportFormProps) {
  const router = useRouter();
  const { mutateAsync: submitReport, isPending } = useSubmitReport();

  // Unique localStorage key scoped per student so different students don't clash
  const draftKey = `report_draft_${student.id}`;

  const [rating, setRating] = useLocalStorage<number>(
    isHistoryView ? `__readonly_rating` : `${draftKey}_rating`,
    initialData?.rating ?? 0
  );
  const [description, setDescription] = useLocalStorage<string>(
    isHistoryView ? `__readonly_desc` : `${draftKey}_desc`,
    initialData?.description ?? ""
  );
  const [testScores, setTestScores, clearTestScores] = useLocalStorage<TestScore[]>(
    isHistoryView ? `__readonly_scores` : `${draftKey}_scores`,
    initialData?.testScores && initialData.testScores.length > 0
      ? initialData.testScores
      : []
  );

  // Fetch mapped subjects for this class/department — cached for 5 min by React Query
  const { data: subjects = [], isLoading: isLoadingSubjects } = useMappedSubjects(
    classId,
    departmentId
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitReport({
        studentId: student.id,
        termId,
        weekNumber,
        behavioralScore: rating,
        attendance: 5, // Default for now
        teacherRemark: description,
        status: 'submitted',
        scores: testScores
          .filter(ts => ts.subject && ts.score)
          .map(ts => ({
            subjectName: ts.subject,
            score: Number(ts.score),
            total: Number(ts.maxScore) || 100
          }))
      });

      toast.success("Report submitted successfully!");
      
      if (!isHistoryView) {
        clearTestScores();
        window.localStorage.removeItem(`${draftKey}_rating`);
        window.localStorage.removeItem(`${draftKey}_desc`);
      }

      router.push("/portal/teacher/reports");
    } catch (error) {
      console.error("Failed to submit report:", error);
    }
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
          subjects={subjects}
          isLoadingSubjects={isLoadingSubjects}
        />

        {!isHistoryView && (
          <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={rating === 0}
              className="h-11 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <CheckCircle2 size={18} className="mr-2 animate-pulse" />
                  Submitting...
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
