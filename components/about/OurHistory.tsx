"use client";

import React from "react";
import { motion } from "framer-motion";
import { historySection } from "@/constants/about";

const OurHistory = () => {
  return (
    <div className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold uppercase tracking-wider text-sm">
                {historySection.label}
              </span>
              <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight tracking-tight">
                {historySection.title}
              </h2>
            </div>
            
            <p className="text-gray-600 font-medium text-lg border-l-4 border-primary pl-4">
              {historySection.description}
            </p>

            <div className="flex flex-col gap-4 text-gray-600 leading-relaxed mt-2">
              {historySection.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img 
                src={historySection.image} 
                alt="El-Shaddai Historic building" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-white/20 rounded-2xl"></div>
            </div>
            
            {/* Stats Overlay positioned absolute on the image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-white rounded-xl shadow-xl p-6 md:p-8 flex flex-col gap-6"
            >
              {historySection.stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-3xl md:text-4xl font-black text-primary">{stat.value}</span>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default OurHistory;
