"use client";

import React from "react";
import { Star } from "lucide-react";
import { behavioralRatings } from "@/constants/teacher/reports.constants";

interface BehavioralRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  isHistoryView: boolean;
}

export const BehavioralRating: React.FC<BehavioralRatingProps> = ({
  rating,
  setRating,
  isHistoryView,
}) => {
  const activeRating = behavioralRatings.find((r) => r.value === rating);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
        Behavioral Performance
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => !isHistoryView && setRating(star)}
              disabled={isHistoryView}
              className={`p-1.5 rounded-full transition-all ${
                rating >= star ? "text-orange-400" : "text-gray-200"
              } ${
                !isHistoryView && rating < star ? "hover:text-orange-200" : ""
              } ${isHistoryView ? "cursor-default" : ""}`}
            >
              <Star
                size={28}
                fill={rating >= star ? "currentColor" : "none"}
                strokeWidth={rating >= star ? 0 : 2}
              />
            </button>
          ))}
        </div>
        {activeRating && (
          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
            {activeRating.label}
          </span>
        )}
      </div>
    </div>
  );
};
