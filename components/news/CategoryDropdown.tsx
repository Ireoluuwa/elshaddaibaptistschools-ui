"use client";

import React, { useState } from "react";
import { ChevronDown, Tags } from "lucide-react";
import { sidebarCategories } from "@/constants/news";
import Link from "next/link";

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden w-full mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
      >
        <div className="flex items-center gap-2 text-primary">
          <Tags size={20} />
          <span className="font-bold">Filter by Category</span>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="divide-y divide-gray-50">
            {sidebarCategories.map((cat: any, idx: number) => (
              <li key={idx}>
                <Link
                  href={cat.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-bg-accent-subtle/20 transition-colors"
                >
                  <span className="text-[#101818] font-medium">{cat.name}</span>
                  <span className="text-xs font-bold text-[#64748b] bg-[#e2e8f0] px-2 py-1 rounded-full">
                    {cat.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
