import React from "react";
import { aboutHero } from "@/constants/about";

const Hero = () => {
  return (
    <div className="relative flex min-h-[500px] w-full flex-col justify-center overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <img 
          alt="School overview" 
          className="h-full w-full object-cover" 
          src={aboutHero.image}
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
      </div>
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-20 lg:px-20 mt-16">
        <div className="flex max-w-[960px] flex-col items-center gap-6 text-center">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl drop-shadow-sm">
            {aboutHero.title}
          </h1>
          <h2 className="text-green-50 text-lg font-normal leading-relaxed max-w-2xl md:text-xl">
            {aboutHero.subtitle}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
