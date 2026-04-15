"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileUp,
  UserPlus,
  ClipboardList,
  UserCheck,
  User,
  BarChart3,
  LogOut,
  ChevronLeft,
  Menu,
  Monitor,
  ChevronUp,
  Settings,
  X,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/portal/teacher", icon: LayoutDashboard },
  { name: "Upload Result", href: "/portal/teacher/results", icon: FileUp },
  { name: "Add Student", href: "/portal/teacher/students", icon: UserPlus },
  { name: "Assignments", href: "/portal/teacher/assignments", icon: ClipboardList },
  { name: "Attendance", href: "/portal/teacher/attendance", icon: UserCheck },
  { name: "CBT", href: "/portal/teacher/cbt", icon: Monitor },
  { name: "Weekly Report", href: "/portal/teacher/reports", icon: BarChart3 },
];

const TeacherSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/portal/teacher") return pathname === href;
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-8 pb-6">
        <img
          src="/logo.png"
          alt="El-Shaddai"
          className="w-10 h-10 object-contain shrink-0"
        />
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-w-0"
          >
            <span className="text-white text-sm font-black tracking-tight truncate">
              EL-SHADDAI
            </span>
            <span className="text-emerald-300/70 text-[10px] font-medium uppercase tracking-widest">
              Teacher Portal
            </span>
          </motion.div>
        )}
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-white/10 mb-4" />

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto scrollbar-hide">
        {sidebarLinks.map((link) => {
          const active = isActive(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
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
              <Icon size={18} className={active ? "text-emerald-400" : "text-white/50 group-hover:text-white/80"} />
              {!collapsed && <span className="truncate">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-3 pb-6 relative">
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
              className="absolute bottom-full left-3 right-3 mb-2 bg-[#142e22] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <Link
                href="/portal/teacher/profile"
                onClick={() => { setProfileOpen(false); setMobileOpen(false); }}
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
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  Mr. Anderson
                </p>
                <p className="text-white/40 text-[11px] truncate">
                  Senior Teacher
                </p>
              </div>
              <ChevronUp
                size={14}
                className={`text-white/30 transition-transform duration-200 ${profileOpen ? '' : 'rotate-180'}`}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-[100dvh] bg-gradient-to-b from-[#0a2118] via-[#0e2e1d] to-[#0a1f15] border-r border-white/5 z-40 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[260px]"
        }`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0e2e1d] border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all z-50 shadow-md"
        >
          <ChevronLeft
            size={14}
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>

        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-[60] w-10 h-10 rounded-xl bg-[#0e2e1d] text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 h-[100dvh] w-[260px] bg-gradient-to-b from-[#0a2118] via-[#0e2e1d] to-[#0a1f15] border-r border-white/5 z-50 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeacherSidebar;
