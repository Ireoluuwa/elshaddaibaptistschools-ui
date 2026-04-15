"use client"
import React, { useState } from "react";
import {
  GraduationCap,
  Menu,
  X,
  Info,
  Phone,
  UserCircle,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#", active: true },
    { name: "About Us", href: "#" },
    { name: "Events", href: "#" },
    { name: "Shop", href: "#" },
    { name: "Members", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e9eef1]">
      {/* Mobile Top Utility Bar */}
      <div className="lg:hidden w-full border-b border-gray-100 py-2 px-6">
        <div className="flex items-center justify-end gap-5">
          <button className="flex items-center gap-1 text-[11px] font-bold text-[#0e2e1d] hover:text-[#006442] transition-colors">
            Get in touch <ChevronDown size={12} />
          </button>
          <div className="flex items-center gap-4">
            <button className="text-[#0e2e1d] hover:text-[#006442]">
              <Info size={16} />
            </button>
            <button className="text-[#0e2e1d] hover:text-[#006442]">
              <Phone size={16} />
            </button>
            <button className="text-[#0e2e1d] hover:text-[#006442]">
              <UserCircle size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Main Header Container */}
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo Section */}
          <div className="flex items-center gap-2 text-[#006442]">
            <GraduationCap size={32} className="fill-current md:size-10" />
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex flex-col items-end gap-2">
            {/* Top Tier Icons (Desktop) */}
            <div className="flex items-center gap-6 mb-1">
              <button className="text-[#0e2e1d] hover:text-[#006442] transition-colors">
                <Info size={18} />
              </button>
              <button className="text-[#0e2e1d] hover:text-[#006442] transition-colors">
                <Phone size={18} />
              </button>
              <button className="text-[#0e2e1d] hover:text-[#006442] transition-colors">
                <UserCircle size={18} />
              </button>
            </div>

            {/* Bottom Tier Links and Button */}
            <div className="flex items-center gap-10">
              <nav className="flex gap-8 items-center">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    className={`text-sm font-semibold transition-colors ${
                      link.active
                        ? "text-[#006442]"
                        : "text-[#0e2e1d] hover:text-[#006442]"
                    }`}
                    href={link.href}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-bold transition-all shadow-md active:scale-95 leading-none">
                <span className="truncate">Be a Member</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-full bg-gray-50 text-[#006442] hover:bg-gray-100 transition-all z-[60]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col h-full pt-24 px-8 pb-12">
            <nav className="flex flex-col gap-6 mb-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold flex items-center justify-between group ${
                    link.active ? "text-[#006442]" : "text-[#0e2e1d]"
                  }`}
                  href={link.href}
                >
                  {link.name}
                  {link.name !== "Home" && (
                    <ChevronDown
                      size={20}
                      className="group-hover:rotate-180 transition-transform text-gray-300"
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Mobile Bottom Action */}
            <div className="mt-12">
              <button className="w-16 h-16 rounded-xl bg-[#006442] flex items-center justify-center text-white shadow-xl active:scale-90 transition-all">
                <UserCircle size={32} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
