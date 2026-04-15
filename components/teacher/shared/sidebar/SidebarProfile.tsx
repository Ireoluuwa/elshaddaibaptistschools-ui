"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, ChevronUp, Settings, LogOut } from "lucide-react";

interface SidebarProfileProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({
  collapsed,
  onNavigate,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="mt-auto px-3 pb-6 relative shrink-0">
      {/* Divider */}
      <div className="mx-2 h-px bg-white/10 mb-4" />

      {/* Profile Popover */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-3 right-3 mb-2 bg-[#142e22] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[70]"
          >
            <Link
              href="/portal/teacher/profile"
              onClick={() => {
                setProfileOpen(false);
                if (onNavigate) onNavigate();
              }}
              className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/8 text-sm font-medium transition-all"
            >
              <Settings size={16} />
              Profile Settings
            </Link>
            <div className="h-px bg-white/8" />
            <Link
              href="/auth/login"
              className="flex items-center gap-3 px-4 py-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all"
            >
              <LogOut size={16} />
              Sign Out
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Card (clickable) */}
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer text-left"
      >
        <div className="w-9 h-9 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center shrink-0">
          <User size={16} className="text-emerald-400" />
        </div>
        {!collapsed && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              className="flex-1 min-w-0"
            >
              <p className="text-white text-sm font-semibold truncate">
                Mr. Anderson
              </p>
              <p className="text-white/40 text-[11px] truncate">
                Senior Teacher
              </p>
            </motion.div>
            <ChevronUp
              size={14}
              className={`text-white/30 transition-transform duration-200 ${
                profileOpen ? "" : "rotate-180"
              }`}
            />
          </>
        )}
      </button>
    </div>
  );
};

export default SidebarProfile;
