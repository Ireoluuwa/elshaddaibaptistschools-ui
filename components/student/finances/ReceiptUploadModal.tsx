"use client";

import React, { useState } from "react";
import { X, Upload, CheckCircle2, Loader2, Calendar, CreditCard } from "lucide-react";

interface ReceiptUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReceiptUploadModal({ isOpen, onClose }: ReceiptUploadModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFileName(null);
      }, 2000);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#0e2e1d]/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-[1.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-[#0e2e1d] uppercase tracking-tight">
              Upload Receipt
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-[#006442]/10 flex items-center justify-center text-[#006442] mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-lg font-bold text-[#0e2e1d] mb-2">Success!</h3>
              <p className="text-sm text-gray-500 font-medium px-8">
                Your payment receipt has been uploaded and is now awaiting verification.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Amount Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#006442] uppercase tracking-[0.2em] opacity-60">
                  Amount Paid (₦)
                </label>
                <div className="relative">
                  <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="number" 
                    required 
                    placeholder="e.g. 50000"
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#006442] uppercase tracking-[0.2em] opacity-60">
                  Payment Date
                </label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="date" 
                    required 
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none transition-all"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#006442] uppercase tracking-[0.2em] opacity-60">
                  Attach Receipt
                </label>
                <label className="relative group cursor-pointer">
                  <input 
                    type="file" 
                    required 
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <div className={`
                    w-full py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all
                    ${fileName 
                      ? "border-[#006442] bg-[#006442]/5 border-solid" 
                      : "border-gray-100 bg-gray-50 group-hover:border-[#006442]/30 group-hover:bg-gray-100/50"
                    }
                  `}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${fileName ? "bg-[#006442] text-white" : "bg-white text-[#006442] shadow-sm"}`}>
                      <Upload size={24} />
                    </div>
                    <div className="text-center px-4">
                      <p className={`text-xs font-bold ${fileName ? "text-[#006442]" : "text-gray-500"}`}>
                        {fileName || "Select receipt image or PDF"}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium mt-1">
                        Max size: 5MB
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="mt-4 h-14 bg-[#006442] hover:bg-[#005236] text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#006442]/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Upload Receipt"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
