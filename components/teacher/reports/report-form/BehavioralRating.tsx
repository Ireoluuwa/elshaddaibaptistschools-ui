"use client";

import React from "react";
import { Star, CalendarCheck } from "lucide-react";

interface RatingStarsProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  max: number;
  isHistoryView: boolean;
  icon?: "star" | "calendar";
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  label,
  value,
  setValue,
  max,
  isHistoryView,
  icon = "star",
}) => {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
        {label}
      </h3>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {stars.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => !isHistoryView && setValue(s)}
              disabled={isHistoryView}
              className={`p-1 rounded-full transition-all ${
                value >= s 
                  ? (icon === "calendar" ? "text-emerald-500" : "text-orange-400") 
                  : "text-gray-200"
              } ${
                !isHistoryView && value < s ? (icon === "calendar" ? "hover:text-emerald-200" : "hover:text-orange-200") : ""
              } ${isHistoryView ? "cursor-default" : ""}`}
            >
              {icon === "calendar" ? (
                <CalendarCheck 
                  size={24} 
                  fill={value >= s ? "currentColor" : "none"}
                  strokeWidth={value >= s ? 0 : 2}
                />
              ) : (
                <Star
                  size={24}
                  fill={value >= s ? "currentColor" : "none"}
                  strokeWidth={value >= s ? 0 : 2}
                />
              )}
            </button>
          ))}
        </div>
        <span className="ml-2 px-3 py-1 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
          {value} / {max}
        </span>
      </div>
    </div>
  );
};

