import React from "react";
import { aboutCTA } from "@/constants/about";

const AboutCTA = () => {
  return (
    <div className="w-full bg-primary py-16">
      <div className="max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          {aboutCTA.title}
        </h2>
        <p className="max-w-2xl text-green-100 text-lg">
          {aboutCTA.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {aboutCTA.buttons.map((btn, idx) => (
             <button 
                key={idx}
                className={`flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 text-base font-bold leading-normal tracking-[0.015em] transition-colors ${
                  btn.primary 
                    ? "bg-white text-primary hover:bg-gray-100 shadow-lg" 
                    : "bg-transparent border border-white hover:bg-white/10 text-white"
                }`}
              >
                {btn.text}
              </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutCTA;
