"use client";

import React from "react";
import { motion } from "framer-motion";
import { facilitiesSection, facilitiesData } from "@/constants/home/facilities";

const Facilities = () => {
  return (
    <div className="w-full bg-white py-16 lg:py-24 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-bold uppercase tracking-wider text-sm">
            {facilitiesSection.label}
          </span>
          <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight mt-2">
            {facilitiesSection.title}
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {facilitiesSection.description}
          </p>
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
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {facilitiesData.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-200">
                <img
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={item.img}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-white font-bold text-xl mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Facilities;
