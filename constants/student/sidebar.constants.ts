import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  Wallet,
  BarChart3,
  Monitor,
} from "lucide-react";

export const sidebarLinks = [
  { name: "Dashboard", href: "/portal/student", icon: LayoutDashboard },
  { name: "View Result", href: "/portal/student/results", icon: GraduationCap },
  { name: "Assignment", href: "/portal/student/assignments", icon: ClipboardList },
  { name: "Finance", href: "/portal/student/finance", icon: Wallet },
  { name: "Weekly Report", href: "/portal/student/reports", icon: BarChart3 },
  { name: "CBT", href: "/portal/student/cbt", icon: Monitor },
];
