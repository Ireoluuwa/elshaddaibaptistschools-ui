"use client";

import React from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
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
          Testimonials
        </span>
        <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight mt-2 mb-16">
          What Our Community Says
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white p-8 md:p-14 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
            <Quote size={24} fill="currentColor" />
          </div>
          <p className="text-gray-600 text-lg md:text-2xl font-light italic leading-relaxed mb-8">
            "Enrolling my children at El-Shaddai Baptist School was the best
            decision we made. The blend of moral upbringing and academic rigor
            is unmatched in the state."
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
              <img
                alt="Mr. Johnson Adeyemi"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFMCuo8apJVgm6g_92T0sQvvrwIJcYk4NkuzxigyV0aJJ9hZRgFsHVSpvwHadwaPX5TY2690XxiO0aIkipWyonABmGCYpRz_rLHOlySifEaLUl_br_fZ2TQOpZeYgPtkeF1NUM1R6ga5aqStRfHSo56bfOHGh3klOkYefOrDze75Euz1aoU4nwWHcF7EGmWMg88jTTV-uECMkOWRFbDjl2lLz32pVMtshVtcsPmxHkndKQ-nVFaCGgQNFoUqMHXEN4KMfsaJKbKA"
              />
            </div>
            <div>
              <h4 className="text-secondary font-bold text-lg">
                Mr. Johnson Adeyemi
              </h4>
              <p className="text-primary text-sm font-medium">
                Parent of Class of '22 Alumnus
              </p>
            </div>
          </div>
          <button className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-20 p-3 text-gray-300 hover:text-primary transition-colors">
            <ChevronLeft size={36} />
          </button>
          <button className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-20 p-3 text-gray-300 hover:text-primary transition-colors">
            <ChevronRight size={36} />
          </button>
        </motion.div>
        <div className="flex justify-center gap-2 mt-8">
          <button className="w-2.5 h-2.5 rounded-full bg-primary transition-all"></button>
          <button className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-primary/50 transition-all"></button>
          <button className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-primary/50 transition-all"></button>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;
