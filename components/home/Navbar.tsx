import React from "react";
import { School, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-[#e9eef1] bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 lg:px-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-primary">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-white">
            <School size={20} />
          </div>
          <h2 className="text-primary dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            El-Shaddai Baptist School
          </h2>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex gap-6">
            <a
              className="text-[#101519] dark:text-gray-300 hover:text-primary dark:hover:text-accent text-sm font-medium leading-normal transition-colors"
              href="#"
            >
              Home
            </a>
            <a
              className="text-[#101519] dark:text-gray-300 hover:text-primary dark:hover:text-accent text-sm font-medium leading-normal transition-colors"
              href="#"
            >
              About
            </a>
            <a
              className="text-[#101519] dark:text-gray-300 hover:text-primary dark:hover:text-accent text-sm font-medium leading-normal transition-colors"
              href="#"
            >
              Admissions
            </a>
            <a
              className="text-[#101519] dark:text-gray-300 hover:text-primary dark:hover:text-accent text-sm font-medium leading-normal transition-colors"
              href="#"
            >
              Academics
            </a>
          </nav>
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors shadow-sm">
            <span className="truncate">Portal Login</span>
          </button>
        </div>
        <button className="lg:hidden p-2 text-primary dark:text-white">
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
