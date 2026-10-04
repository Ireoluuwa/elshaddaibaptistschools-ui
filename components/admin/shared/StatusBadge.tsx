import React from "react";

const styles = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  gray: "bg-gray-100 text-gray-500 ring-gray-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  red: "bg-red-50 text-red-600 ring-red-100",
};

interface StatusBadgeProps {
  tone: keyof typeof styles;
  children: React.ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ tone, children }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ring-1 ${styles[tone]}`}
  >
    {children}
  </span>
);

export default StatusBadge;
