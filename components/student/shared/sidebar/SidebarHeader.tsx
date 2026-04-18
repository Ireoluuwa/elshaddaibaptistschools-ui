"use client";

import React from "react";
import { motion } from "framer-motion";

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <div className="flex items-center gap-3 px-5 pt-8 pb-6 shrink-0">
      <img
        src="/logo.png"
        alt="El-Shaddai"
        className="w-10 h-10 object-contain shrink-0"
      />
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="flex flex-col min-w-0"
        >
          <span className="text-white text-sm font-black tracking-tight truncate">
            EL-SHADDAI
          </span>
          <span className="text-emerald-300/70 text-[10px] font-medium uppercase tracking-widest">
            Student Portal
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default SidebarHeader;
