"use client";

import React from "react";
import { motion } from "framer-motion";
import { facultySection, facultyMembers } from "@/constants/home/faculty";

const Faculty = () => {
  return (
    <div className="w-full bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold uppercase tracking-wider text-sm">
            {facultySection.label}
          </span>
          <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight mt-2">
            {facultySection.title}
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {facultyMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md group-hover:border-primary transition-colors duration-300">
                <img
                  alt={member.name}
                  className="w-full h-full object-cover"
                  src={member.image}
                />
              </div>
              <h3 className="text-secondary text-xl font-bold">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-bold uppercase tracking-wide mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Faculty;
