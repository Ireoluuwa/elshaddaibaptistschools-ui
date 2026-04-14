import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative flex min-h-[600px] w-full flex-col justify-center overflow-hidden bg-gray-50 dark:bg-background-dark group">
      <div className="absolute inset-0 z-0">
        <img
          alt="Smiling Nigerian students in school uniforms collaborating outdoors"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKpmsc7KyvIL6wbzRzwlyLACaK7r29VvyJNgckygfHVVSn_Wgbc-1Hko9DKWHJ8xbffwCGlasUuq5sgQhxtMT8JmCvrnvrHh5qeqT29D4NCS6TCt8GDLo9ejk2-6LuLYPrpnzSvHdafYHuFUXAQ2GA8pgEo1tGUBdC6OtLPq48u79OW7zC9FN7wB8-A2d0QqSYXZSmis0T2BMc3JPf6o1l0DK3cxT6_36kfopuu9csfMQ23YIsfJyFq62sLRuEVgJKbvx7ReKIFA"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/40 mix-blend-multiply dark:from-background-dark/95 dark:to-background-dark/60"></div>
      </div>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
        <ChevronLeft size={32} />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
        <ChevronRight size={32} />
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        <button className="w-2.5 h-2.5 rounded-full bg-white ring-2 ring-white/50 transition-all"></button>
        <button className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white transition-all"></button>
        <button className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white transition-all"></button>
      </div>
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-20 lg:px-20">
        <div className="flex max-w-[960px] flex-col items-center gap-6 text-center">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl drop-shadow-sm">
            Nurturing Minds, <br /> Building Character
          </h1>
          <h2 className="text-gray-100 text-lg font-normal leading-relaxed max-w-2xl md:text-xl">
            Empowering the next generation of Nigerian leaders through holistic
            education, moral integrity, and academic excellence in a supportive
            environment.
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg transition-transform hover:scale-105">
              Apply Now
            </button>
            <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
