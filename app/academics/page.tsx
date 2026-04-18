import React from 'react';
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AcademicsHero from "@/components/academics/AcademicsHero";
import AcademicStage from "@/components/academics/AcademicStage";
import AcademicsCTA from "@/components/academics/AcademicsCTA";
import { academicStages } from "@/constants/academics";

export default function AcademicsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#101818] font-display antialiased transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow w-full">
        <AcademicsHero />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 md:py-24 flex flex-col gap-24 md:gap-32 lg:gap-40">
          {academicStages.map((stage, idx) => (
            <AcademicStage 
              key={stage.id}
              {...stage}
            />
          ))}
        </div>
        
        <AcademicsCTA />
      </main>
      
      <Footer />
    </div>
  );
}
