import {
  LayoutDashboard,
  FileUp,
  UserPlus,
  ClipboardList,
  UserCheck,
  BarChart3,
  Monitor,
} from "lucide-react";

export const sidebarLinks = [
  { name: "Dashboard", href: "/portal/teacher", icon: LayoutDashboard },
  { name: "Upload Result", href: "/portal/teacher/results", icon: FileUp },
  { name: "Add Student", href: "/portal/teacher/students", icon: UserPlus },
  { name: "Assignments", href: "/portal/teacher/assignments", icon: ClipboardList },
  // { name: "Attendance", href: "/portal/teacher/attendance", icon: UserCheck },
  { name: "CBT", href: "/portal/teacher/cbt", icon: Monitor },
  { name: "Weekly Report", href: "/portal/teacher/reports", icon: BarChart3 },
];
