"use client";

import React from "react";
import { ArrowRight, Check, GraduationCap } from "lucide-react";

export interface ClassNavItem {
  key: string;
  label: string;
  // Set to show a move (e.g. JSS1 → JSS2). null means the class graduates.
  to?: string | null;
  detail: string;
  done: boolean;
}

interface ClassNavProps {
  items: ClassNavItem[];
  selected: string;
  onSelect: (key: string) => void;
  hint?: string;
}

// Connected step list on desktop, horizontal scroller on mobile.
const ClassNav: React.FC<ClassNavProps> = ({ items, selected, onSelect, hint }) => (
  <nav aria-label="Classes" className="lg:sticky lg:top-8">
    {hint && <p className="hidden lg:block text-xs font-medium text-muted mb-3 px-3">{hint}</p>}
    <ol className="flex lg:flex-col gap-1 lg:gap-0 overflow-x-auto pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
      {items.map((item, i) => {
        const active = item.key === selected;
        const isLast = i === items.length - 1;
        return (
          <li key={item.key} className="relative shrink-0">
            {/* Rail connecting this step to the next */}
            {!isLast && (
              <span
                aria-hidden
                className={`hidden lg:block absolute left-[23px] top-9 -bottom-3 w-0.5 rounded-full ${
                  item.done ? "bg-brand" : "bg-line"
                }`}
              />
            )}
            <button
              onClick={() => onSelect(item.key)}
              aria-current={active ? "step" : undefined}
              className={`relative w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left border transition-all ${
                active
                  ? "bg-white border-line shadow-sm"
                  : "border-transparent hover:bg-white/70"
              }`}
            >
              <span
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  item.done
                    ? "bg-brand text-white"
                    : active
                      ? "bg-white border-2 border-brand"
                      : "bg-canvas border-2 border-line"
                }`}
              >
                {item.done ? (
                  <Check size={13} strokeWidth={3} />
                ) : (
                  active && <span className="w-2 h-2 rounded-full bg-brand" />
                )}
              </span>

              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-ink">{item.label}</span>
                  {item.to !== undefined && (
                    <>
                      <ArrowRight size={14} className="text-muted/70 shrink-0" />
                      {item.to === null ? (
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                          <GraduationCap size={15} /> Graduate
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-muted">{item.to}</span>
                      )}
                    </>
                  )}
                </span>
                <span className={`hidden lg:block text-xs mt-0.5 ${item.done ? "text-brand" : "text-muted"}`}>
                  {item.done ? "Done" : item.detail}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default ClassNav;
