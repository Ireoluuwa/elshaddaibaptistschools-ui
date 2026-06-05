"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { admissionsFAQ } from "@/constants/admissions";

const AdmissionsFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">FAQs</span>
          <h2 className="text-secondary text-3xl md:text-4xl font-black mt-2">
            Common Questions
          </h2>
        </div>

        <div className="space-y-3">
          {admissionsFAQ.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-secondary font-semibold text-base pr-4">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-primary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsFAQ;
