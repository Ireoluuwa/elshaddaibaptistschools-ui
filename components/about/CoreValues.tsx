"use client";

import React from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { coreValuesSection, coreValuesData } from "@/constants/about";

const CoreValues = () => {
  return (
    <div className="w-full bg-bg-accent-subtle/30 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col gap-12"
      >
        <div className="flex flex-col gap-4 text-center md:text-left md:flex-row md:justify-between md:items-end">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              {coreValuesSection.label}
            </span>
            <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight tracking-tight">
              {coreValuesSection.title}
            </h2>
          </div>
          <p className="text-gray-600 text-base max-w-md">
            {coreValuesSection.description}
          </p>
        </div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coreValuesData.map((value, i) => {
            const IconComponent = (Icons as any)[value.iconName];
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group flex flex-col items-center text-center gap-4 rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-2 lg:p-10"
              >
                <div className="size-16 rounded-2xl bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-md">
                  {IconComponent && <IconComponent size={32} />}
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <h3 className="text-secondary text-xl font-bold">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CoreValues;
