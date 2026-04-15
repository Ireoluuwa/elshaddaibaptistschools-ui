"use client";

import React, { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  testimonialsSection,
  testimonialsData,
} from "@/constants/home/testimonials";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const current = testimonialsData[currentIndex];

  return (
    <div className="w-full bg-white py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-bg-accent-subtle rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-bg-accent-light/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <span className="text-primary font-bold uppercase tracking-wider text-sm">
          {testimonialsSection.label}
        </span>
        <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight mt-2 mb-16">
          {testimonialsSection.title}
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white p-8 md:p-14 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 min-h-[400px] flex flex-col justify-center"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                <Quote size={24} fill="currentColor" />
              </div>
              <p className="text-gray-600 text-lg md:text-2xl font-light italic leading-relaxed mb-8">
                "{current.quote}"
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
                  <img
                    alt={current.name}
                    className="w-full h-full object-cover"
                    src={current.image}
                  />
                </div>
                <div>
                  <h4 className="text-secondary font-bold text-lg">
                    {current.name}
                  </h4>
                  <p className="text-primary text-sm font-medium">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20 p-3 text-gray-300 hover:text-primary transition-colors bg-white/50 rounded-full md:bg-transparent"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-20 p-3 text-gray-300 hover:text-primary transition-colors bg-white/50 rounded-full md:bg-transparent"
          >
            <ChevronRight size={36} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentIndex === i ? "bg-primary w-6" : "bg-gray-300 hover:bg-primary/50"
              }`}
            ></button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;
