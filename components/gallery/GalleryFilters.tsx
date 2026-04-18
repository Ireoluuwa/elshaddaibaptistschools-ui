import React, { useState } from "react";
import * as Icons from "lucide-react";
import { galleryFilters } from "@/constants/gallery";

const GalleryFilters = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="sticky top-20 z-40 mx-auto max-w-7xl px-6 lg:px-20 pb-10 bg-white/95 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-4">
        {galleryFilters.map((filter) => {
          const Icon = filter.icon ? (Icons as any)[filter.icon] : null;
          const isActive = activeFilter === filter.name;

          return (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`group relative flex h-12 items-center justify-center gap-3 rounded-2xl px-8 transition-all shadow-sm font-bold text-sm ${
                isActive 
                  ? "bg-primary text-white shadow-primary/20 shadow-lg scale-105" 
                  : "bg-white border border-gray-100 text-secondary hover:bg-primary/5 hover:border-primary/20"
              }`}
            >
              {Icon && <Icon size={20} className={isActive ? "text-white" : "text-primary"} />}
              <span>{filter.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default GalleryFilters;
