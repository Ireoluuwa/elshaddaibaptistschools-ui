import React from "react";
import { academicsHero } from "@/constants/academics";

const AcademicsHero = () => {
  return (
    <section className="relative w-full bg-[#f6f8f8] py-12 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col items-center text-center">
        <div className="max-w-3xl mb-12">
          <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 uppercase tracking-widest">
            {academicsHero.tag}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary tracking-tight mb-6 leading-tight">
            Nurturing Minds, <br/>
            <span className="text-primary">{academicsHero.titleAccent}</span>
          </h1>
          <p className="text-lg text-[#64748b] font-light leading-relaxed">
            {academicsHero.description}
          </p>
        </div>
        
        <div className="w-full h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden relative shadow-2xl border-8 border-white">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img 
            alt={academicsHero.imageAlt} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            src={academicsHero.image}
          />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 text-left">
            <p className="text-white font-bold text-xl md:text-2xl">
              {academicsHero.imageCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicsHero;
