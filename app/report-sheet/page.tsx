"use client";

import React from "react";
import { Download, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ReportSheetPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans text-black overflow-auto print:bg-white print:py-0 print:px-0">
      
      {/* Top Action Bar (Hidden when printing) */}
      <div className="max-w-[210mm] mx-auto flex items-center justify-between mb-6 print:hidden">
        <Link 
          href="/portal/student/results" 
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ChevronLeft size={18} />
          Back to Portal
        </Link>
        
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2 bg-[#006442] hover:bg-[#005236] text-white font-bold rounded-lg shadow-sm transition-colors"
        >
          <Download size={18} />
          Download Result
        </button>
      </div>

      {/* A4 Document Container */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-xl min-h-[297mm] p-8 md:p-12 print:shadow-none print:w-full print:max-w-none print:p-0 print:m-0 border border-transparent print:border-none">
        
        {/* Header Block */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 items-center">
            {/* Logo Placeholder */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#006442] flex items-center justify-center p-2">
              <div className="text-center font-bold text-[10px] sm:text-xs text-[#006442] leading-tight flex flex-col items-center">
                <span>EL-SHADDAI</span>
                <span className="text-[20px] sm:text-[24px]">🎓</span>
                <span>COLLEGE</span>
              </div>
            </div>
            {/* School Name */}
            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black" style={{ fontFamily: "serif" }}>
                EL-SHADDAI
              </h1>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-widest text-[#006442]" style={{ fontFamily: "serif" }}>
                BAPTIST COLLEGE
              </h1>
            </div>
          </div>
          {/* Report Sheet Label */}
          <div className="bg-[#659146] text-white font-bold px-6 py-2 border-2 border-black -mt-4 -mr-4 print:-mt-0 print:-mr-0">
            Report Sheet
          </div>
        </div>

        {/* Student Data Underline Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6 font-bold text-sm">
          <div className="flex items-end gap-2">
            <span className="shrink-0">Name of Student:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5">Ige Favour</div>
          </div>
          <div className="flex items-end gap-2 hidden md:flex">
            <span className="shrink-0 flex-1"></span>
          </div>
          <div className="flex items-end gap-2">
            <span className="shrink-0">Year and Session:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5">(2024/2025)</div>
          </div>
          <div className="flex items-end gap-2">
            <span className="shrink-0">Class:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5">JSS 2</div>
          </div>
          <div className="flex items-end gap-2">
            <span className="shrink-0">Class Teacher:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5">Miss Tomori</div>
          </div>
          <div className="flex items-end gap-2">
            <span className="shrink-0">Term:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5">Third Term</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Main Transcript Table */}
          <div className="flex-1 w-full border-2 border-black">
            <table className="w-full text-center text-xs font-bold border-collapse">
              <thead className="bg-[#f8cbab]">
                <tr>
                  <th className="border-2 border-black py-2 px-1 text-left text-white bg-[#e08f51]">Subject</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Test 1 (15)</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Test 2 (15)</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Exam (70)</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Total (100)</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Grade</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sub: "English Language", t1: "11", t2: "11", ex: "45", tot: "67", gr: "B-" },
                  { sub: "Mathematics", t1: "11", t2: "11", ex: "50", tot: "72", gr: "B+" },
                  { sub: "Basic Science", t1: "16", t2: "10", ex: "38.5", tot: "64.5", gr: "C+" },
                  { sub: "Basic Technology", t1: "10", t2: "12", ex: "60", tot: "82", gr: "A" },
                  { sub: "Home Economic", t1: "10", t2: "08", ex: "59.5", tot: "77.5", gr: "A-" },
                  { sub: "Agricultural Science", t1: "10", t2: "16", ex: "51.5", tot: "77.5", gr: "A-" },
                  { sub: "Social Studies", t1: "10", t2: "08", ex: "53.5", tot: "81.5", gr: "A" },
                  { sub: "Security Education", t1: "10", t2: "08", ex: "66", tot: "84", gr: "A" },
                  { sub: "C. R. S", t1: "18", t2: "10", ex: "55", tot: "83", gr: "A" },
                  { sub: "C. C. A.", t1: "10", t2: "10", ex: "64", tot: "84", gr: "A+" },
                  { sub: "French", t1: "-", t2: "-", ex: "34", tot: "34", gr: "F" },
                  { sub: "History", t1: "02", t2: "14", ex: "49", tot: "65", gr: "B-" },
                  { sub: "Yoruba", t1: "11", t2: "07", ex: "48", tot: "66", gr: "B-" },
                  { sub: "Music", t1: "10", t2: "10", ex: "62", tot: "82", gr: "A" },
                  { sub: "Business Studies", t1: "11", t2: "11", ex: "67", tot: "89", gr: "A+" },
                  { sub: "Civic Education", t1: "10", t2: "14", ex: "62", tot: "86", gr: "A+" },
                  { sub: "P. H. E", t1: "15", t2: "15", ex: "39.5", tot: "69.5", gr: "B-" },
                  { sub: "Coding", t1: "-", t2: "-", ex: "45", tot: "45", gr: "D" },
                  { sub: "Computer", t1: "-", t2: "-", ex: "69", tot: "69", gr: "B-" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="border border-black py-1 px-2 text-left">{row.sub}</td>
                    <td className="border border-black py-1 px-1">{row.t1}</td>
                    <td className="border border-black py-1 px-1">{row.t2}</td>
                    <td className="border border-black py-1 px-1">{row.ex}</td>
                    <td className="border border-black py-1 px-1">{row.tot}</td>
                    <td className="border border-black py-1 px-1">{row.gr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Term Summary Block Inside Main Table Container */}
            <div className="flex justify-between px-4 py-2 font-bold text-xs border-t border-black bg-gray-50/50">
               <span>1st Term: 69.6%</span>
               <span>2nd Term: 75.7%</span>
               <span>3rd Term: 72.5%</span>
            </div>
          </div>

          {/* Right Column Tables */}
          <div className="w-full md:w-56 flex flex-col gap-6 shrink-0">
            {/* Grading System Table */}
            <table className="w-full text-center text-xs font-bold border-collapse border-2 border-black">
               <thead className="bg-[#f8cbab] italic font-serif">
                 <tr>
                   <th colSpan={2} className="border-b-2 border-black py-1">Grading System</th>
                 </tr>
               </thead>
               <tbody>
                  {[
                    { gr: "A*", rng: "90 - 100" },
                    { gr: "A+", rng: "85 - 89" },
                    { gr: "A", rng: "80 - 84" },
                    { gr: "A-", rng: "75 - 79" },
                    { gr: "B+", rng: "70 - 74" },
                    { gr: "B-", rng: "65 - 69" },
                    { gr: "C+", rng: "61 - 64" },
                    { gr: "C", rng: "55 - 60" },
                    { gr: "C-", rng: "50 - 54" },
                    { gr: "D", rng: "45 - 49" },
                    { gr: "P", rng: "40 - 44" },
                    { gr: "F", rng: "0 - 39" }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="border border-black py-0.5 px-2 text-left">{row.gr}</td>
                      <td className="border border-black py-0.5 px-2">{row.rng}</td>
                    </tr>
                  ))}
               </tbody>
            </table>

            {/* Attendance Table */}
            <table className="w-full text-center text-xs font-bold border-collapse border-2 border-black">
               <thead className="bg-[#f8cbab]">
                 <tr>
                   <th colSpan={2} className="border-b-2 border-black py-1.5 text-white bg-[#e08f51]">Attendance</th>
                 </tr>
               </thead>
               <tbody>
                  <tr>
                    <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Total Days of School:</td>
                    <td className="border border-black py-1.5 px-2">126</td>
                  </tr>
                  <tr>
                    <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Days Attended:</td>
                    <td className="border border-black py-1.5 px-2">120</td>
                  </tr>
                  <tr>
                    <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Days Absent:</td>
                    <td className="border border-black py-1.5 px-2">06</td>
                  </tr>
                  <tr>
                    <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Vacation Date:</td>
                    <td className="border border-black py-1.5 px-1 truncate text-[10px]">AUG 1st, 2025</td>
                  </tr>
                  <tr>
                    <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Sch. Resumes:</td>
                    <td className="border border-black py-1.5 px-1 truncate text-[10px]">SEPT. 8th, 2025</td>
                  </tr>
               </tbody>
            </table>
          </div>
        </div>

        {/* Footer Score Remarks */}
        <div className="mt-6 flex flex-col gap-6 text-sm font-bold">
           <div className="flex justify-between items-center px-4">
              <span>Total Marks Obtainable: 1900</span>
              <span>Total Marks Obtained: 1378.5</span>
              <span>Overall score: 72.8</span>
           </div>
           
           <div className="text-center">
              He shows a conscientious effort to learn. <span className="font-black text-lg">(PROMOTED)</span>
           </div>

           <div className="flex justify-between items-end mt-4">
              <span>V.P's Remark:</span>
              <div className="w-64 border-b-2 border-black flex flex-col items-center">
                 <span className="text-[10px] uppercase invisible">Signature</span>
              </div>
              <div className="w-48 border-b-2 border-black mt-10 text-right pr-2 text-[10px] block relative">
                 <span className="absolute -bottom-4 right-0">Date & Signature</span>
              </div>
           </div>
           
           <div className="flex justify-end items-end mt-4">
              <div className="w-1/2 border-b-2 border-black mt-10 text-right pr-2 text-[10px] block relative">
                 <span className="absolute -bottom-4 right-0">Date & Signature</span>
              </div>
           </div>

           {/* Tuition Line */}
           <div className="text-xs flex items-center justify-center gap-2 mt-6">
              <span>Outstanding: ₦</span>
              <span className="w-24 border-b border-black inline-block"></span>
              <span>, Next Term Tuition: ₦</span>
              <span className="w-24 border-b border-black inline-block"></span>
              <span>, I.C.T: </span>
              <span className="w-24 border-b border-black inline-block"></span>
              <span>Total: </span>
              <span className="w-24 border-b border-black inline-block"></span>
           </div>
        </div>
      </div>
    </div>
  );
}
