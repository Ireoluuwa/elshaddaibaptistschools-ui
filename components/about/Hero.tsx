"use client";

import React from "react";
import { motion } from "framer-motion";
import { aboutHero } from "@/constants/about";

const Hero = () => {
  return (
    <div className="relative flex min-h-[400px] lg:min-h-[450px] w-full flex-col justify-center overflow-hidden bg-[#0e2e1d]">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            alt="About Us Hero"
            className="h-full w-full object-cover"
            src={aboutHero.image}
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#0e2e1d]/70"></div>
        <div className="absolute inset-0 bg-[#0e2e1d]/30 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-6 py-14 lg:px-20 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex max-w-[800px] flex-col items-center gap-6 text-center"
        >
          <h1 className="text-white text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl whitespace-pre-line drop-shadow-2xl">
            {aboutHero.title}
          </h1>
          <p className="text-gray-300 text-lg font-normal leading-relaxed max-w-2xl md:text-xl drop-shadow-md">
            {aboutHero.subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
