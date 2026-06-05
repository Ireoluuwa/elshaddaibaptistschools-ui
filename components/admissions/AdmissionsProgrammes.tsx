"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { admissionsProgrammes } from "@/constants/admissions";

const AdmissionsProgrammes = () => {
  return (
    <div className="w-full bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">Programmes</span>
          <h2 className="text-secondary text-3xl md:text-4xl font-black mt-2">
            Choose Your Level
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            We offer admission across all levels of basic and secondary education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {admissionsProgrammes.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl border p-8 ${prog.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-secondary text-xl font-bold">{prog.level}</h3>
                  <span className={`inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full ${prog.badge}`}>
                    {prog.ages}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{prog.desc}</p>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Required Documents</p>
                <ul className="space-y-2">
                  {prog.requirements.map((req, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={15} className="text-primary shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsProgrammes;
