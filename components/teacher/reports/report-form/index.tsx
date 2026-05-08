"use client";

import React, { useState, useEffect, useRef } from "react";
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

  // Standard React state - local storage removed as requested
  const [rating, setRating] = useState<number>(initialData?.rating ?? 0);
  const [description, setDescription] = useState<string>(initialData?.description ?? "");
  const [attendance, setAttendance] = useState<number>(initialData?.attendance ?? 5);
  const [testScores, setTestScores] = useState<TestScore[]>(
    initialData?.testScores && initialData.testScores.length > 0
      ? initialData.testScores
      : []
  );

  const isDirtyRef = useRef(false);

  // Sync initialData to local states when it changes (e.g. after backend fetch)
  useEffect(() => {
    if (initialData && !isDirtyRef.current) {
      setRating(initialData.rating ?? 0);
      setDescription(initialData.description ?? "");
      setAttendance(initialData.attendance ?? 5);
      setTestScores(initialData.testScores ?? []);
    }
  }, [initialData]);

  const [isPublishing, setIsPublishing] = useState(false);

 
  useEffect(() => {
    
    if (isHistoryView || isPublishing || isPending) return;

    const timer = setTimeout(async () => {
   
      if (!isDirtyRef.current || isPublishing) return;

      try {
        await submitReport({
          studentId: student.id,
          termId,
          weekNumber,
          behavioralScore: rating,
          attendance: Number(attendance),
          teacherRemark: description,
          status: 'DRAFT',
          scores: testScores
            .filter(ts => ts.subject && ts.score)
            .map(ts => ({
              subjectName: ts.subject,
              score: Number(ts.score),
              total: Number(ts.maxScore) || 100
            }))
        });
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [rating, description, attendance, testScores, student.id, termId, weekNumber, isHistoryView, submitReport, isPublishing, isPending]);

  // Track changes to mark as dirty
  const onRatingChange = (val: number) => {
    setRating(val);
    isDirtyRef.current = true;
  };
  const onDescriptionChange = (val: string) => {
    setDescription(val);
    isDirtyRef.current = true;
  };
  const onAttendanceChange = (val: number) => {
    setAttendance(val);
    isDirtyRef.current = true;
  };
  const onTestScoresChange = (val: TestScore[]) => {
    setTestScores(val);
    isDirtyRef.current = true;
  };

  // Fetch mapped subjects for this class/department — cached for 5 min by React Query
  const { data: subjects = [], isLoading: isLoadingSubjects } = useMappedSubjects(
    classId,
    departmentId
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true); // Lock auto-save
    
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

      isDirtyRef.current = false; // Reset dirty state
      toast.success("Report published successfully!");
      router.push("/portal/teacher/reports");
    } catch (error) {
      setIsPublishing(false); // Unlock if failed
      console.error("Failed to submit report:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <ReportHeader student={student} />

      <form onSubmit={(e) => e.preventDefault()} className="p-6 flex flex-col gap-8">
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
          setTestScores={onTestScoresChange}
          isHistoryView={isHistoryView}
          subjects={subjects}
          isLoadingSubjects={isLoadingSubjects}
        />

        {!isHistoryView && (
          <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSave}
              disabled={rating === 0 || isPublishing || isPending}
              className="h-11 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? (
                <>
                  <CheckCircle2 size={18} className="mr-2 animate-pulse" />
                  Publishing...
                </>
              ) : (
                "Publish Report"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
