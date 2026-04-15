"use client";

import React, { useState } from "react";
import { Plus, Trash2, CheckCircle2, ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { behavioralRatings, availableSubjects } from "@/constants/teacher/reports.constants";

interface ReportFormProps {
  student: { id: string; name: string; class: string; status: string };
}

export default function ReportForm({ student }: ReportFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [testScores, setTestScores] = useState([{ id: Date.now(), subject: "", score: "", maxScore: "" }]);
  const [isSaved, setIsSaved] = useState(false);

  const activeRating = behavioralRatings.find((r) => r.value === rating);

  const addTestScore = () => {
    setTestScores([...testScores, { id: Date.now(), subject: "", score: "", maxScore: "" }]);
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
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/portal/teacher/reports")}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0e2e1d] hover:border-gray-300 transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-[#0e2e1d] text-xl font-bold">{student.name}</h2>
            <p className="text-gray-500 text-sm">{student.class} • ID: {student.id}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 flex flex-col gap-8">
        
        {/* Section 1: Behavioral Rating */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Behavioral Performance</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1.5 rounded-full transition-all ${
                    rating >= star ? "text-orange-400" : "text-gray-200 hover:text-orange-200"
                  }`}
                >
                  <Star size={28} fill={rating >= star ? "currentColor" : "none"} strokeWidth={rating >= star ? 0 : 2} />
                </button>
              ))}
            </div>
            {activeRating && (
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
                {activeRating.label}
              </span>
            )}
          </div>
        </div>

        {/* Section 2: Teacher Comments */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Teacher's Comments</h3>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Enter comments about ${student.name.split(" ")[0]}'s behavior and participation this week...`}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d] resize-none"
            required
          />
        </div>

        {/* Section 3: Test Scores */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Academic Scores (Optional)</h3>
            <button
              type="button"
              onClick={addTestScore}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#006442] bg-[#f0f7f4] hover:bg-[#006442]/10 rounded-lg transition-all"
            >
              <Plus size={14} /> Add Score
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {testScores.map((test, index) => (
              <div key={test.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                <div className="flex-1 w-full relative">
                  <select
                    value={test.subject}
                    onChange={(e) => updateTestScore(test.id, 'subject', e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm"
                  >
                    <option value="" disabled>Select Subject</option>
                    {availableSubjects.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="w-24 relative">
                    <input
                      type="number"
                      placeholder="Score"
                      value={test.score}
                      onChange={(e) => updateTestScore(test.id, 'score', e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center"
                    />
                  </div>
                  <span className="text-gray-400 font-medium">/</span>
                  <div className="w-24 relative">
                    <input
                      type="number"
                      placeholder="Total"
                      value={test.maxScore}
                      onChange={(e) => updateTestScore(test.id, 'maxScore', e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm text-center"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeTestScore(test.id)}
                  disabled={testScores.length === 1}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto sm:ml-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
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
      </form>
    </div>
  );
}
