"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/constants/home/hero";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const current = heroSlides[currentIndex];

  return (
    <div className="relative flex min-h-[500px] lg:min-h-[550px] w-full flex-col justify-center overflow-hidden bg-[#0e2e1d] group">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              alt={current.title.replace("\n", " ")}
              className="h-full w-full object-cover"
              src={current.image}
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0e2e1d]/90"></div>
        <div className="absolute inset-0 bg-[#0e2e1d]/20 mix-blend-multiply"></div>
      </div>

      {/* Manual Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex active:scale-90"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex active:scale-90"
      >
        <ChevronRight size={28} />
      </button>



      {/* Content Area */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-14 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex max-w-[960px] flex-col items-center gap-6 text-center"
          >
            <h1 className="text-white text-3xl font-black leading-[1.1] tracking-tight md:text-4xl lg:text-5xl whitespace-pre-line drop-shadow-2xl">
              {current.title}
            </h1>
            <p className="text-gray-300 text-lg font-normal leading-relaxed max-w-2xl md:text-lg drop-shadow-md">
              {current.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button className="flex min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[#006442] hover:bg-[#005236] text-white text-base font-bold transition-all shadow-lg active:scale-95">
                {current.ctaPrimary}
              </button>
              <button className="flex min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-white/5 backdrop-blur-md border border-white/40 hover:bg-white/20 text-white text-base font-bold transition-all active:scale-95">
                {current.ctaSecondary}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
