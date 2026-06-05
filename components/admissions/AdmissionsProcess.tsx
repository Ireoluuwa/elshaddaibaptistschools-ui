"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { admissionsProcess } from "@/constants/admissions";

const AdmissionsProcess = () => {
  return (
    <div className="w-full bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">How It Works</span>
          <h2 className="text-secondary text-3xl md:text-4xl font-black mt-2">
            The Admissions Process
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Four straightforward steps from application to your child's first day at school.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line on large screens */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-green-100 z-0" />

          {admissionsProcess.map((step, i) => {
            const IconComponent = (Icons as any)[step.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8 gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center text-primary mb-2">
                  {IconComponent && <IconComponent size={32} />}
                </div>
                <span className="text-xs font-black text-primary/40 uppercase tracking-widest">Step {step.step}</span>
                <h3 className="text-secondary text-lg font-bold">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsProcess;
