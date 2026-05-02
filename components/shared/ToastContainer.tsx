'use client';

import { useEffect } from 'react';
import { useToastStore, Toast, ToastType } from '@/store/toast.store';

const icons: Record<ToastType, JSX.Element> = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#1d5d3b" fillOpacity="0.15" />
      <path d="M6 10.5l2.5 2.5 5-5" stroke="#1d5d3b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#ef4444" fillOpacity="0.15" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#f59e0b" fillOpacity="0.15" />
      <path d="M10 6.5v4M10 13.5v.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#3b82f6" fillOpacity="0.15" />
      <path d="M10 9v5M10 6.5v.5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const borderColors: Record<ToastType, string> = {
  success: '#1d5d3b',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

const titleColors: Record<ToastType, string> = {
  success: '#1d5d3b',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useToastStore((state) => state.removeToast);
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, removeToast]);

  return (
    <div
      style={{
        borderLeft: `3px solid ${borderColors[toast.type]}`,
        animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="flex items-start gap-3 bg-white rounded-xl shadow-lg px-4 py-3.5 w-80 max-w-full relative overflow-hidden"
    >
      <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold leading-snug"
          style={{ color: titleColors[toast.type] }}
        >
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{toast.message}</p>
        )}
      </div>

      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 text-gray-300 hover:text-gray-500 transition-colors mt-0.5"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="absolute bottom-0 left-0 h-0.5"
        style={{
          background: borderColors[toast.type],
          animation: `toastProgress ${duration}ms linear forwards`,
          width: '100%',
          opacity: 0.3,
        }}
      />
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes toastProgress {
          from { transform: scaleX(1); transform-origin: left; }
          to   { transform: scaleX(0); transform-origin: left; }
        }
      `}</style>

      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 items-end">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </>
  );
}
