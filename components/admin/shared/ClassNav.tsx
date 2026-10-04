"use client";

import React from "react";
import { Check } from "lucide-react";

export interface ClassNavItem {
  key: string;
  label: React.ReactNode;
  detail: string;
  done: boolean;
}

interface ClassNavProps {
  items: ClassNavItem[];
  selected: string;
  onSelect: (key: string) => void;
  hint?: string;
}

// Vertical class list on desktop, horizontal scroller on mobile.
const ClassNav: React.FC<ClassNavProps> = ({ items, selected, onSelect, hint }) => (
  <nav aria-label="Classes" className="lg:sticky lg:top-8">
    {hint && <p className="hidden lg:block text-xs font-medium text-muted mb-2 px-1">{hint}</p>}
    <ol className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0 -mx-1 px-1">
      {items.map((item) => {
        const active = item.key === selected;
        return (
          <li key={item.key} className="shrink-0">
            <button
              onClick={() => onSelect(item.key)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left border transition-colors ${
                active ? "bg-white border-brand" : "border-transparent hover:bg-white hover:border-line"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  item.done
                    ? "bg-brand text-white"
                    : active
                      ? "border-2 border-brand"
                      : "border border-muted/40"
                }`}
              >
                {item.done && <Check size={12} strokeWidth={3} />}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-ink whitespace-nowrap">{item.label}</span>
                <span className="hidden lg:block text-xs text-muted">{item.detail}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default ClassNav;
