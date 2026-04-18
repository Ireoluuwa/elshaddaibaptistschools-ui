"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

const FinanceWidget = () => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-[#0e2e1d] rounded-3xl p-6 text-white shadow-xl flex flex-col h-full relative overflow-hidden group"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl transform -translate-x-10 translate-y-10" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
            <Wallet className="text-emerald-300" size={16} />
          </div>
          <h2 className="text-sm font-bold text-white/90 tracking-wide uppercase">Finance Summary</h2>
        </div>
        <button 
          onClick={() => setShowBalance(!showBalance)}
          className="text-white/50 hover:text-white transition-colors p-1"
        >
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center my-2">
        <p className="text-emerald-200/60 text-xs font-semibold mb-1 uppercase tracking-wider">Outstanding Balance</p>
        <div className="flex items-end gap-2 h-10">
          <AnimatePresence mode="popLayout">
            {showBalance ? (
              <motion.span 
                key="balance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-4xl font-black text-white tracking-tight"
              >
                ₦0.00
              </motion.span>
            ) : (
              <motion.div 
                key="hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center h-full gap-1 pt-2"
              >
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-white/80" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="text-xs font-semibold text-white/80">Term Cleared</span>
        </div>
        <Link 
          href="/portal/student/finance"
          className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1 transition-colors"
        >
          Details <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

export default FinanceWidget;
