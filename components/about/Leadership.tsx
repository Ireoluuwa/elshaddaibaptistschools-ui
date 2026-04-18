"use client";

import React from "react";
import { motion } from "framer-motion";
import { leadershipSection, leadershipMembers } from "@/constants/about";
import { Linkedin, Twitter, Mail } from "lucide-react";

const Leadership = () => {
  return (
    <div className="w-full bg-white py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col gap-16"
      >
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">
            {leadershipSection.label}
          </span>
          <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight tracking-tight">
            {leadershipSection.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {leadershipSection.description}
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
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {leadershipMembers.map((member, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="group flex flex-col w-full bg-bg-accent-subtle/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="overflow-hidden bg-gray-200 aspect-[4/5] relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-white text-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                      <Linkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                      <Twitter size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                      <Mail size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center bg-white border-t border-gray-100 flex-1 flex flex-col justify-center">
                <h3 className="text-secondary text-xl font-bold">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold text-sm mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Leadership;
