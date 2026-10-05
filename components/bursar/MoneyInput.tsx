"use client";

import React from "react";

interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
  id?: string;
  label?: string;
  size?: "sm" | "md";
  highlight?: boolean;
}

// Naira amount input: digits only, shown with thousands separators.
const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange, id, label, size = "md", highlight }) => (
  <div
    className={`flex items-center rounded-lg border bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15 transition-colors ${
      size === "sm" ? "h-9" : "h-10"
    } ${highlight ? "border-clay" : "border-line"}`}
  >
    <span className="pl-3 pr-1 text-sm text-muted select-none">₦</span>
    <input
      id={id}
      aria-label={label}
      inputMode="numeric"
      value={value ? value.toLocaleString() : ""}
      placeholder="0"
      onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, "")) || 0)}
      className="w-full h-full pr-3 bg-transparent outline-none text-sm text-ink font-medium tabular-nums placeholder:text-muted/50"
    />
  </div>
);

export default MoneyInput;
