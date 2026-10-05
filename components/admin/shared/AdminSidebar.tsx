"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Menu, X, LogOut } from "lucide-react";

import SidebarItem from "@/components/teacher/shared/sidebar/SidebarItem";
import { adminSidebarLinks } from "@/constants/admin/sidebar.constants";
import { useLogout, useProfileQuery } from "@/hooks/auth.hooks";

type SidebarLink = (typeof adminSidebarLinks)[number];

interface AdminSidebarProps {
  links?: SidebarLink[];
  portalLabel?: string;
  homeHref?: string;
  // Omit to show the account card without a profile link.
  profileHref?: string;
  roleLabel?: string;
}

// Shared by the admin and bursar portals.
const AdminSidebar = ({
  links = adminSidebarLinks,
  portalLabel = "Admin Portal",
  homeHref = "/portal/admin",
  profileHref = "/portal/admin/profile",
  roleLabel = "Administrator",
}: AdminSidebarProps) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleLogout = useLogout();
  const { data: profile } = useProfileQuery();

  const isActive = (href: string) => {
    if (href === homeHref) return pathname === href;
    return pathname.startsWith(href);
  };

  const accountCard = (
    <>
      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white text-sm font-bold uppercase">
        {profile?.username?.[0] ?? roleLabel[0]}
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate group-hover:underline underline-offset-2">
            {profile?.username ?? roleLabel}
          </p>
          <p className="text-white/40 text-[11px]">{profileHref ? "View profile" : roleLabel}</p>
        </div>
      )}
    </>
  );

  const renderContent = () => (
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
            <span className="text-white/50 text-[10px] font-medium uppercase tracking-widest">
              {portalLabel}
            </span>
          </div>
        )}
      </div>

      <div className="mx-5 h-px bg-white/10 mb-4 shrink-0" />

      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto scrollbar-hide py-2">
        {links.map((link) => (
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
        <div
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
            profileHref && pathname === profileHref ? "bg-white/15" : "bg-white/5"
          }`}
        >
          {profileHref ? (
            <Link
              href={profileHref}
              onClick={() => setMobileOpen(false)}
              title="Profile"
              className="flex items-center gap-3 flex-1 min-w-0 group"
            >
              {accountCard}
            </Link>
          ) : (
            <div className="flex items-center gap-3 flex-1 min-w-0">{accountCard}</div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              title="Sign out"
              className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-all"
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
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-[100dvh] bg-ink border-r border-white/5 z-40 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[260px]"
        }`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-ink border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all z-50 shadow-md"
        >
          <ChevronLeft
            size={14}
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {renderContent()}
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-[60] w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
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
              className="lg:hidden fixed top-0 left-0 h-[100dvh] w-[260px] bg-ink border-r border-white/5 z-50 shadow-2xl"
            >
              {renderContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
