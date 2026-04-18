"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  href,
  icon: Icon,
  active,
  collapsed,
  onClick,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
        active
          ? "bg-white/15 text-white shadow-sm"
          : "text-white/60 hover:text-white hover:bg-white/8"
      }`}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-400 rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <Icon
        size={18}
        className={
          active ? "text-emerald-400" : "text-white/50 group-hover:text-white/80"
        }
      />
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -5 }}
          className="truncate"
        >
          {name}
        </motion.span>
      )}
    </Link>
  );
};

export default SidebarItem;
