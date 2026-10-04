import {
  LayoutDashboard,
  CalendarRange,
  ArrowUpCircle,
  GraduationCap,
  Users,
} from "lucide-react";

export const adminSidebarLinks = [
  { name: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { name: "Sessions & Terms", href: "/portal/admin/sessions", icon: CalendarRange },
  { name: "Promotion", href: "/portal/admin/promotion", icon: ArrowUpCircle },
  { name: "Students", href: "/portal/admin/students", icon: GraduationCap },
  { name: "Teachers", href: "/portal/admin/teachers", icon: Users },
];
