"use client";

import React from "react";
import { Student } from "../../../../types/report";

interface TeacherCommentsProps {
  student: Student;
  description: string;
  setDescription: (value: string) => void;
  isHistoryView: boolean;
}

export const TeacherComments: React.FC<TeacherCommentsProps> = ({
  student,
  description,
  setDescription,
  isHistoryView,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
        Teacher's Comments
      </h3>
      <textarea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isHistoryView}
        placeholder={`Enter comments about ${student.name.split(" ")[0]
          }'s behavior and participation this week...`}
        className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d] resize-none disabled:bg-gray-100 disabled:text-gray-600"
        required={!isHistoryView}
      />
    </div>
  );
};
