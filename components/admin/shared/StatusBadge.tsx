import React from "react";

// Quiet status label: coloured dot + text, no pill.
const tones = {
  brand: { dot: "bg-brand", text: "text-brand" },
  clay: { dot: "bg-clay", text: "text-clay" },
  muted: { dot: "bg-muted/50", text: "text-muted" },
  danger: { dot: "bg-danger", text: "text-danger" },
};

interface StatusBadgeProps {
  tone: keyof typeof tones;
  children: React.ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ tone, children }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-medium capitalize ${tones[tone].text}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${tones[tone].dot}`} />
    {children}
  </span>
);

export default StatusBadge;
