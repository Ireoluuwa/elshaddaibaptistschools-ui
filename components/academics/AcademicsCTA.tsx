import React from "react";
import { academicsCTA } from "@/constants/academics";
import Link from "next/link";

const AcademicsCTA = () => {
  return (
    <section className="w-full bg-primary/5 py-16 md:py-24 border-t border-primary/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-secondary mb-6 tracking-tight leading-tight">
          {academicsCTA.title}
        </h2>
        <p className="text-lg text-[#64748b] mb-10 max-w-2xl mx-auto leading-relaxed">
          {academicsCTA.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href={academicsCTA.primaryButton.link} 
            className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-2xl h-14 px-8 bg-primary hover:bg-[#0e2e1d] text-white text-base font-bold tracking-wide transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
          >
            {academicsCTA.primaryButton.text}
          </Link>
          <Link 
            href={academicsCTA.secondaryButton.link} 
            className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-2xl h-14 px-8 bg-white border border-gray-200 hover:bg-gray-50 text-secondary text-base font-bold tracking-wide transition-all hover:-translate-y-1 shadow-sm"
          >
            {academicsCTA.secondaryButton.text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AcademicsCTA;
