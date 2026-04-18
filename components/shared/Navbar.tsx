"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about",
      dropdown: [
        { name: "About Us", href: "/about" },
        { name: "Academics", href: "/academics" },
        { name: "Gallery", href: "#" },
      ],
    },
    { name: "Admissions", href: "#" },
    { name: "News & Events", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ];

  const [aboutOpen, setAboutOpen] = useState(false); 
  const [isAboutHovered, setIsAboutHovered] = useState(false); 

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
          {/* Logo Section (Left) */}
          <Link href="/">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="El-Shaddai Baptist School Logo"
              className="h-16 w-auto md:h-20"
            />
          </div>
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 flex-1 px-10">
            {navLinks.map((link) => {
              const isActive = (link.href !== "#" && pathname === link.href) || 
                               (link.dropdown?.some(item => item.href !== "#" && pathname === item.href));
              
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => link.dropdown && setIsAboutHovered(true)}
                  onMouseLeave={() => link.dropdown && setIsAboutHovered(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#006442]"
                        : "text-[#0e2e1d] hover:text-[#006442]"
                    }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          isAboutHovered ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {link.dropdown && (
                    <AnimatePresence>
                      {isAboutHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[calc(100%-4px)] left-0 min-w-[180px] bg-white rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 z-[100]"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-6 py-2.5 text-sm text-[#0e2e1d] hover:bg-[#006442]/5 hover:text-[#006442] transition-colors font-medium"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Actions Section (Right) */}
          <div className="hidden lg:flex flex-col items-end gap-2 px-10">
            {/* Top Tier Icons */}
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

            {/* Bottom Tier Button */}
            <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-bold transition-all shadow-md active:scale-95 leading-none">
              <span className="truncate">Be a Member</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-full bg-gray-50 text-[#006442] hover:bg-gray-100 transition-all z-[60] relative"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-8 py-8">
              <nav className="flex flex-col">
                {navLinks.map((link, index) => {
                  const isActive = (link.href !== "#" && pathname === link.href) || 
                                   (link.dropdown?.some(item => item.href !== "#" && pathname === item.href));

                  return (
                    <div key={link.name} className="flex flex-col">
                      <Link
                        href={link.dropdown ? "#" : link.href}
                        onClick={(e) => {
                          if (link.dropdown) {
                            e.preventDefault();
                            setAboutOpen(!aboutOpen);
                          } else {
                            setIsOpen(false);
                          }
                        }}
                        className={`flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 group cursor-pointer ${
                          isActive
                            ? "text-[#006442] font-bold"
                            : "text-[#0e2e1d] font-semibold hover:text-[#006442]"
                        }`}
                      >
                        <motion.span 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.06,
                            ease: "easeOut",
                          }}
                          className="text-lg"
                        >
                          {link.name}
                        </motion.span>
                        {link.dropdown && (
                          <ChevronDown
                            size={18}
                            className={`text-gray-400 group-hover:text-[#006442] transition-all duration-300 ${
                              aboutOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </Link>

                      {link.dropdown && (
                        <AnimatePresence>
                          {aboutOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-gray-50/50 rounded-lg overflow-hidden flex flex-col"
                            >
                              {link.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`block py-4 px-8 text-base font-medium border-l-4 transition-all ${
                                    pathname === subItem.href
                                      ? "text-[#006442] border-[#006442] bg-[#006442]/5"
                                      : "text-[#0e2e1d] border-transparent hover:text-[#006442] hover:border-[#006442]/30"
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Mobile Bottom Action */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="mt-8"
              >
                <button className="w-14 h-14 rounded-xl bg-[#006442] flex items-center justify-center text-white shadow-lg active:scale-90 transition-all hover:bg-[#005236]">
                  <UserCircle size={28} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 

export default Navbar;




