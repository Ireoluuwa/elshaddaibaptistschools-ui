import {
  LayoutDashboard,
  CalendarRange,
  ArrowUpCircle,
  GraduationCap,
  Users,
  MessageSquareText,
  Landmark,
} from "lucide-react";

export const adminSidebarLinks = [
  { name: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { name: "Sessions & Terms", href: "/portal/admin/sessions", icon: CalendarRange },
  { name: "V.P's Remarks", href: "/portal/admin/remarks", icon: MessageSquareText },
  { name: "Promotion", href: "/portal/admin/promotion", icon: ArrowUpCircle },
  { name: "Students", href: "/portal/admin/students", icon: GraduationCap },
  { name: "Teachers", href: "/portal/admin/teachers", icon: Users },
  { name: "Bursars", href: "/portal/admin/bursars", icon: Landmark },
];
