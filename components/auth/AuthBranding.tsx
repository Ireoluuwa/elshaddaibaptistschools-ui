"use client";

import React from "react";
import { motion } from "framer-motion";

const AuthBranding = () => {
  return (
    <div className="relative hidden lg:flex w-[45%] bg-[#f7f5f0] flex-col items-center justify-center px-8">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006442' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-xs"
      >
        <div className="mb-8">
          <img
            src="/logo.png"
            alt="El-Shaddai Baptist School Logo"
            className="w-40 h-40 object-contain drop-shadow-lg"
          />
        </div>

        <h1 className="text-[#0e2e1d] text-2xl md:text-3xl font-black leading-tight tracking-tight">
          El-Shaddai Baptist School
        </h1>

        <p className="text-[#5a6b5e] text-sm font-medium tracking-widest mt-3">
          Faith &bull; Character &bull; Excellence
        </p>

        <div className="w-12 h-[2px] bg-[#006442]/30 mt-8 mb-4 rounded-full" />

        <p className="text-[#8a9b8e] text-xs italic font-light">
          Psalm 119:11
        </p>
      </motion.div>
    </div>
  );
};

export default AuthBranding;
