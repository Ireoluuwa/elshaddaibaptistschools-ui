"use client";

import React from "react";
import { ChevronLeft, Download, Award, MessageSquare, ListTodo, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mockWeeklyReports } from "@/constants/student/reports.constants";

export default function WeeklyReportDetailPage() {
  const params = useParams();
  const reportId = params.weekId as string;
  
  const report = mockWeeklyReports.find(r => r.id === reportId) || mockWeeklyReports[0];

  const renderRating = (total: number, current: number) => {
    return (
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <Star 
            key={i} 
            size={24} 
            className={`${i < current ? "text-[#006442]" : "text-gray-100 placeholder:opacity-20"}`}
            fill={i < current ? "currentColor" : "none"} 
            strokeWidth={i < current ? 0 : 2}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Top Action Bar */}
      <div className="flex items-center justify-start">
        <Link 
          href="/portal/student/reports" 
          className="flex items-center gap-2 px-2 py-2 bg-white text-gray-500 font-bold rounded-xl border border-gray-100 hover:bg-gray-50 transition-all shadow-sm group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
         
        </Link>
      </div>

      {/* Main Report Body (No Card) */}
      <div className="min-h-[600px] print:p-0">
        
        {/* Report Header */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-black text-[#0e2e1d] uppercase tracking-tight">
              Week {report.week} Report
            </h1>
          </div>
          <p className="text-gray-400 text-sm font-medium">
            {report.term} • {report.year}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Behavior & Comments */}
          <div className="flex flex-col gap-12">
            
            {/* Behavioral Rating */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Star size={16} className="text-[#006442]" />
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                  Behavioral Grade
                </h2>
              </div>
              {renderRating(5, report.behavioralRating)}
              <p className="mt-6 text-sm font-bold text-gray-500 leading-relaxed italic">
                {report.behavioralRating === 5 ? "Exemplary behavior throughout the week." : "Demonstrating positive growth and engagement."}
              </p>
            </section>

            {/* Teacher Comments */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare size={16} className="text-[#006442]" />
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                  Teacher's Remarks
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                 <p className="text-sm text-gray-500 leading-relaxed font-medium">
                   "{report.teacherComments}"
                 </p>
                 <div className="pt-6 mt-2 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#006442] flex items-center justify-center text-white text-[10px] font-bold">
                        MT
                      </div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase">Miss Tomori</span>
                   </div>
                   <span className="text-[9px] font-bold text-[#006442]/50 uppercase tracking-widest leading-none">Form Teacher</span>
                 </div>
              </div>
            </section>

          </div>

          {/* Right Column: Mini Scores */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <ListTodo size={16} className="text-[#006442]" />
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                Weekly Assessment
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {report.testScores.map((score, i) => (
                <div key={i} className="flex items-center justify-between py-5 group">
                   <div className="flex flex-col gap-1">
                     <p className="text-sm font-bold text-gray-700 uppercase tracking-tight group-hover:text-[#006442] transition-colors">{score.subject}</p>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Academic Assessment</p>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-bold text-[#006442]">{score.score} / {score.maxScore}</p>
                     <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest leading-none mt-1">Score</p>
                   </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <footer className="text-center text-gray-400 text-[10px] py-12 font-bold uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Student Portal.
      </footer>
    </div>
  );
}
