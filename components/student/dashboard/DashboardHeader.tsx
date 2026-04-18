"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Bell } from "lucide-react";

const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-2xl font-black text-secondary tracking-tight">
          Dashboard
        </h1>
      </div>


    </motion.div>
  );
};

export default DashboardHeader;
