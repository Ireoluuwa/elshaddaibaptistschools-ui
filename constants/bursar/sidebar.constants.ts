import { LayoutDashboard, ReceiptText, Wallet } from "lucide-react";
import type { SidebarEntry } from "@/constants/admin/sidebar.constants";

export const bursarSidebarLinks: SidebarEntry[] = [
  { name: "Overview", href: "/portal/bursar", icon: LayoutDashboard },
  { name: "Next Term Bill", href: "/portal/bursar/bills", icon: ReceiptText },
  { name: "Student Fees", href: "/portal/bursar/fees", icon: Wallet },
];
