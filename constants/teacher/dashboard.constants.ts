import {
  UserPlus,
  UserCheck,
  ClipboardList,
  FileUp,
  BarChart3,
  User,
  Monitor,
  LucideIcon,
} from "lucide-react";

export interface DashboardAction {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const classroomActions: DashboardAction[] = [
  {
    name: "Add Student",
    description: "Enroll new students",
    href: "/portal/teacher/students",
    icon: UserPlus,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Attendance",
    description: "Mark daily register",
    href: "/portal/teacher/attendance",
    icon: UserCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    name: "Upload Assignment",
    description: "Create new tasks",
    href: "/portal/teacher/assignments",
    icon: ClipboardList,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    name: "Upload Result",
    description: "Publish exam grades",
    href: "/portal/teacher/results",
    icon: FileUp,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
];

export const profileActions: DashboardAction[] = [
  {
    name: "Weekly Report",
    description: "Class performance stats",
    href: "/portal/teacher/reports",
    icon: BarChart3,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  {
    name: "My Profile",
    description: "Update teacher info",
    href: "/portal/teacher/profile",
    icon: User,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
  },
];

export const cbtCard = {
  name: "CBT",
  description: "Computer Based Testing",
  subtitle: "Manage & create tests",
  href: "/portal/teacher/cbt",
  icon: Monitor,
};
