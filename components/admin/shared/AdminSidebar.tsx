"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Menu, X, LogOut } from "lucide-react";

import SidebarItem from "@/components/teacher/shared/sidebar/SidebarItem";
import { adminSidebarLinks } from "@/constants/admin/sidebar.constants";
import { useLogout, useProfileQuery } from "@/hooks/auth.hooks";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleLogout = useLogout();
  const { data: profile } = useProfileQuery();

  const isActive = (href: string) => {
    if (href === "/portal/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-8 pb-6 shrink-0">
        <img
          src="/logo.png"
          alt="El-Shaddai"
          className="w-10 h-10 object-contain shrink-0"
        />
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-black tracking-tight truncate">
              EL-SHADDAI
            </span>
            <span className="text-emerald-300/70 text-[10px] font-medium uppercase tracking-widest">
              Admin Portal
            </span>
          </div>
        )}
      </div>

      <div className="mx-5 h-px bg-white/10 mb-4 shrink-0" />

      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto scrollbar-hide py-2">
        {adminSidebarLinks.map((link) => (
          <SidebarItem
            key={link.href}
            {...link}
            active={isActive(link.href)}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Profile */}
      <div className="mt-auto px-3 pb-6 shrink-0">
        <div className="mx-2 h-px bg-white/10 mb-4" />
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center shrink-0 text-emerald-300 text-sm font-bold uppercase">
            {profile?.username?.[0] ?? "A"}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {profile?.username ?? "Administrator"}
              </p>
              <p className="text-white/40 text-[11px]">Administrator</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              title="Sign out"
              className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
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

export default AdminSidebar;
