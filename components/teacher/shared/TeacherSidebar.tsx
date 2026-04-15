"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Menu, X } from "lucide-react";

import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarItem from "./sidebar/SidebarItem";
import SidebarProfile from "./sidebar/SidebarProfile";
import { sidebarLinks } from "@/constants/teacher/sidebar.constants";

const TeacherSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/portal/teacher") return pathname === href;
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      <SidebarHeader collapsed={collapsed} />

      <div className="mx-5 h-px bg-white/10 mb-4 shrink-0" />

      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto scrollbar-hide py-2">
        {sidebarLinks.map((link) => (
          <SidebarItem
            key={link.href}
            {...link}
            active={isActive(link.href)}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      <SidebarProfile
        collapsed={collapsed}
        onNavigate={() => setMobileOpen(false)}
      />
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-[100dvh] bg-[#0e2e1d] border-r border-white/5 z-40 transition-all duration-300 ${
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
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
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
              className="lg:hidden fixed top-0 left-0 h-[100dvh] w-[260px] bg-[#0e2e1d] border-r border-white/5 z-50 shadow-2xl"
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
