import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm text-center">
        <img
          src="/logo.png"
          alt="El-Shaddai Baptist School Logo"
          className="w-20 h-20 object-contain mx-auto mb-8"
        />

        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight">
          Forgot Your Password?
        </h1>

        <p className="text-gray-500 text-sm mt-4 leading-relaxed">
          For security reasons, passwords can only be reset by the school
          administration. Please visit the admin office or contact them
          directly to request a password reset.
        </p>

        <div className="mt-8 p-4 rounded-xl bg-white border border-gray-200 text-left">
          <p className="text-[#0e2e1d] text-sm font-semibold mb-1">
            Admin Office
          </p>
          <p className="text-gray-500 text-xs leading-relaxed">
            Monday &ndash; Friday, 8:00 AM &ndash; 4:00 PM
          </p>
        </div>

        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-[#006442] text-sm font-semibold mt-8 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
