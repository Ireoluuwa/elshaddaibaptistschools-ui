"use client";

import React, { useState } from "react";
import ResultCheckerModal from "@/components/student/results/ResultCheckerModal";

export default function StudentResultsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 p-2 sm:p-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase mb-4">
          Exam Result
        </h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 bg-[#006442] hover:bg-[#005236] text-white text-sm font-bold rounded flex items-center justify-center transition-colors shadow-sm"
        >
          Check Result
        </button>
      </div>

      {/* Modal */}
      <ResultCheckerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
