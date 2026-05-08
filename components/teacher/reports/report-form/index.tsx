"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReportFormProps, TestScore } from "../../../../types/report";
import { ReportHeader } from "./ReportHeader";
import { RatingStars } from "./BehavioralRating";
import { TeacherComments } from "./TeacherComments";
import { TestScores } from "./TestScores";
import { useMappedSubjects } from "@/hooks/academics.hooks";
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

  // Local state only - no auto-save or local storage
  const [rating, setRating] = useState<number>(initialData?.rating ?? 0);
  const [description, setDescription] = useState<string>(initialData?.description ?? "");
  const [attendance, setAttendance] = useState<number>(initialData?.attendance ?? 5);
  const [testScores, setTestScores] = useState<TestScore[]>(
    initialData?.testScores && initialData.testScores.length > 0
      ? initialData.testScores
      : []
  );

  // Load initial data when switching students or when data is available
  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating ?? 0);
      setDescription(initialData.description ?? "");
      setAttendance(initialData.attendance ?? 5);
      setTestScores(initialData.testScores ?? []);
    }
  }, [initialData, student.id]);

  const [isPublishing, setIsPublishing] = useState(false);

  const onRatingChange = (val: number) => setRating(val);
  const onDescriptionChange = (val: string) => setDescription(val);
  const onAttendanceChange = (val: number) => setAttendance(val);
  const onScoresChange = (val: TestScore[]) => setTestScores(val);

  // Fetch mapped subjects for this class/department
  const { data: subjects = [], isLoading: isLoadingSubjects } = useMappedSubjects(
    classId,
    departmentId
  );

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      await submitReport({
        studentId: student.id,
        termId,
        weekNumber,
        behavioralScore: rating,
        attendance: Number(attendance),
        teacherRemark: description,
        status: 'PUBLISHED',
        scores: testScores
          .filter(ts => ts.subject && ts.score)
          .map(ts => ({
            subjectName: ts.subject,
            score: Number(ts.score),
            total: Number(ts.maxScore) || 100
          }))
      });

      toast.success("Report published successfully!");
      router.push("/portal/teacher/reports");
    } catch (error) {
      setIsPublishing(false);
      console.error("Failed to submit report:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <ReportHeader student={student} />

      <form 
        onSubmit={(e) => e.preventDefault()} 
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        className="p-6 flex flex-col gap-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
          <RatingStars
            label="Attendance"
            value={attendance}
            setValue={onAttendanceChange}
            max={5}
            icon="calendar"
            isHistoryView={isHistoryView}
          />
          <RatingStars
            label="Behavioral Score"
            value={rating}
            setValue={onRatingChange}
            max={5}
            icon="star"
            isHistoryView={isHistoryView}
          />
        </div>

        <TeacherComments
          student={student}
          description={description}
          setDescription={onDescriptionChange}
          isHistoryView={isHistoryView}
        />

        <TestScores
          testScores={testScores}
          setTestScores={onScoresChange}
          isHistoryView={isHistoryView}
          subjects={subjects}
          isLoadingSubjects={isLoadingSubjects}
        />

        {!isHistoryView && (
          <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPending || isHistoryView || isPublishing}
              className={`
                flex items-center gap-2 px-8 py-3 bg-[#006442] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#006442]/20 hover:scale-105 active:scale-95 transition-all
                disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed
              `}
            >
              {isPublishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  Publish Report
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
