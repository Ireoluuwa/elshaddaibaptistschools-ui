"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SidebarItem from "@/components/teacher/shared/sidebar/SidebarItem";
import type { SidebarGroup } from "@/constants/admin/sidebar.constants";

interface SidebarGroupItemProps {
  group: SidebarGroup;
  isActive: (href: string) => boolean;
  collapsed: boolean;
  onNavigate: () => void;
}

// Collapsible sidebar section. Opens by itself while one of its pages is showing.
const SidebarGroupItem: React.FC<SidebarGroupItemProps> = ({ group, isActive, collapsed, onNavigate }) => {
  const childActive = group.children.some((c) => isActive(c.href));
  // null = follow the current page; true/false = the user toggled it.
  const [manualOpen, setManualOpen] = useState<boolean | null>(null);
  const open = manualOpen ?? childActive;
  const Icon = group.icon;

  const renderChild = (child: SidebarGroup["children"][number]) => (
    <SidebarItem
      key={child.href}
      {...child}
      active={isActive(child.href)}
      collapsed={collapsed}
      onClick={onNavigate}
    />
  );

  // Icon-only sidebar: no room for a nested list, so show the pages directly.
  if (collapsed) return <>{group.children.map(renderChild)}</>;

  return (
    <div>
      <button
        onClick={() => setManualOpen(!open)}
        aria-expanded={open}
        className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          childActive && !open ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/8"
        }`}
      >
        <Icon
          size={18}
          className={childActive ? "text-emerald-400" : "text-white/50 group-hover:text-white/80"}
        />
        <span className="flex-1 text-left truncate">{group.name}</span>
        <ChevronDown
          size={15}
          className={`text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-1 ml-[21px] pl-2 border-l border-white/10 flex flex-col gap-1">
          {group.children.map(renderChild)}
        </div>
      )}
    </div>
  );
};

export default SidebarGroupItem;
