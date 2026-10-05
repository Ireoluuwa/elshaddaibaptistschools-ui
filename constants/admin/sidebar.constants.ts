import {
  LayoutDashboard,
  CalendarRange,
  ArrowUpCircle,
  GraduationCap,
  Users,
  UserCog,
  MessageSquareText,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export interface SidebarLinkItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

// A collapsible section holding related links.
export interface SidebarGroup {
  name: string;
  icon: LucideIcon;
  children: SidebarLinkItem[];
}

export type SidebarEntry = SidebarLinkItem | SidebarGroup;

export const isSidebarGroup = (entry: SidebarEntry): entry is SidebarGroup => "children" in entry;

export const adminSidebarLinks: SidebarEntry[] = [
  { name: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { name: "Sessions & Terms", href: "/portal/admin/sessions", icon: CalendarRange },
  { name: "V.P's Remarks", href: "/portal/admin/remarks", icon: MessageSquareText },
  { name: "Promotion", href: "/portal/admin/promotion", icon: ArrowUpCircle },
  {
    name: "Manage Users",
    icon: UserCog,
    children: [
      { name: "Students", href: "/portal/admin/students", icon: GraduationCap },
      { name: "Teachers", href: "/portal/admin/teachers", icon: Users },
      { name: "Bursars", href: "/portal/admin/bursars", icon: Landmark },
    ],
  },
];
