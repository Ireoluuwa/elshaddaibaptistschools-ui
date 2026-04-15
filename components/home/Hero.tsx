"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative flex min-h-[600px] w-full flex-col justify-center overflow-hidden bg-gray-50 group">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          alt="Smiling Nigerian students in school uniforms collaborating outdoors"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKpmsc7KyvIL6wbzRzwlyLACaK7r29VvyJNgckygfHVVSn_Wgbc-1Hko9DKWHJ8xbffwCGlasUuq5sgQhxtMT8JmCvrnvrHh5qeqT29D4NCS6TCt8GDLo9ejk2-6LuLYPrpnzSvHdafYHuFUXAQ2GA8pgEo1tGUBdC6OtLPq48u79OW7zC9FN7wB8-A2d0QqSYXZSmis0T2BMc3JPf6o1l0DK3cxT6_36kfopuu9csfMQ23YIsfJyFq62sLRuEVgJKbvx7ReKIFA"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0e2e1d]/80"></div>
        <div className="absolute inset-0 bg-[#0e2e1d]/20 mix-blend-multiply"></div>
      </div>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
        <ChevronLeft size={32} />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
        <ChevronRight size={32} />
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        <button className="w-2.5 h-2.5 rounded-full bg-white ring-4 ring-white/20 transition-all"></button>
        <button className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/60 transition-all"></button>
        <button className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/60 transition-all"></button>
      </div>
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-20 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex max-w-[960px] flex-col items-center gap-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-4xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
          >
            Nurturing Minds, <br /> Building Character
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-100 text-lg font-normal leading-relaxed max-w-2xl md:text-xl"
          >
            Empowering the next generation of Nigerian leaders through holistic
            education, moral integrity, and academic excellence in a supportive
            environment.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-5 mt-6"
          >
            <button className="flex min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[#006442] hover:bg-[#005236] text-white text-base font-bold transition-all shadow-lg active:scale-95">
              Apply Now
            </button>
            <button className="flex min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-white/10 backdrop-blur-md border border-white/40 hover:bg-white/20 text-white text-base font-bold transition-all active:scale-95">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
