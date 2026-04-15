"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel — Branding */}
      <div className="relative w-full lg:w-[45%] bg-gradient-to-br from-[#f7f5f0] via-[#f0ece3] to-[#e8e2d6] flex flex-col items-center justify-center px-8 py-16 lg:py-0">
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
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/logo.png"
              alt="El-Shaddai Baptist School Logo"
              className="w-40 h-40 object-contain drop-shadow-lg"
            />
          </div>

          {/* School Name */}
          <h1 className="text-[#0e2e1d] text-2xl md:text-3xl font-black leading-tight tracking-tight">
            El-Shaddai Baptist School
          </h1>

          {/* Tagline */}
          <p className="text-[#5a6b5e] text-sm font-medium tracking-widest mt-3">
            Faith &bull; Character &bull; Excellence
          </p>

          {/* Divider */}
          <div className="w-12 h-[2px] bg-[#006442]/30 mt-8 mb-4 rounded-full" />

          {/* Bible Verse */}
          <p className="text-[#8a9b8e] text-xs italic font-light">
            Psalm 119:11
          </p>
        </motion.div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 lg:py-0 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-[#0e2e1d] text-3xl md:text-4xl font-black tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Please enter your details to sign in to the portal.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-6"
          >
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-[#0e2e1d] text-sm font-semibold"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Student or Staff ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 text-[#0e2e1d] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006442]/30 focus:border-[#006442] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[#0e2e1d] text-sm font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-gray-50/50 text-[#0e2e1d] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006442]/30 focus:border-[#006442] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#006442] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 rounded border-2 border-gray-300 peer-checked:border-[#006442] peer-checked:bg-[#006442] transition-all flex items-center justify-center">
                    {rememberMe && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-600 text-sm group-hover:text-[#0e2e1d] transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-[#006442] text-sm font-semibold hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full h-12 rounded-xl bg-[#006442] hover:bg-[#005236] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#006442]/20 transition-colors cursor-pointer"
            >
              Sign In
              <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* Help Text */}
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-xs leading-relaxed">
              Need help accessing your account?
              <br />
              <a
                href="#"
                className="text-[#006442] font-semibold hover:underline"
              >
                Contact the school administration office.
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
