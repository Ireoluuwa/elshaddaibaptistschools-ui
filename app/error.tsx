'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/store/toast.store';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Application Error:', error);
    
    toast.error(
      'Application Error',
      'An unexpected error occurred. Our team has been notified.'
    );
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fafafa] selection:bg-[#1d5d3b]/10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="relative inline-flex">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-50 border border-red-100 shadow-sm relative z-10"
          >
            <AlertCircle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
          </motion.div>
          <div className="absolute inset-0 bg-red-400/10 blur-2xl rounded-full scale-150 animate-pulse" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            System Interruption
          </h1>
          <p className="text-base text-gray-500 leading-relaxed max-w-[320px] mx-auto">
            Something went wrong while processing your request. Please try again or return to safety.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => reset()}
            className="group flex items-center justify-center gap-2 px-6 py-4 bg-[#1d5d3b] text-white rounded-2xl font-semibold shadow-lg shadow-[#1d5d3b]/20 hover:bg-[#15452c] transition-all"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try to Recover
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 border border-gray-100 rounded-2xl font-semibold shadow-sm hover:bg-gray-50 hover:border-gray-200 transition-all"
          >
            <Home className="w-5 h-5" />
            Go back home
          </motion.button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-left"
          >
            <div className="px-4 py-3 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Error Diagnostic</p>
              <div className="max-h-32 overflow-auto scrollbar-hide">
                <code className="text-xs font-mono text-red-600/80 break-words">
                  {error.message || 'Unknown runtime exception'}
                </code>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="fixed bottom-8 text-[11px] font-medium text-gray-400 tracking-widest uppercase opacity-40">
        El-Shaddai Baptist Schools • Error Boundary
      </div>
    </div>
  );
}
