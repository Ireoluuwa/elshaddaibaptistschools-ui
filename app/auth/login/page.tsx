import AuthBranding from "@/components/auth/AuthBranding";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-2 py-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm text-[#0e2e1d] text-sm font-medium hover:border-[#006442] hover:text-[#006442] transition-all shadow-sm"
      >
        <ArrowLeft size={16} />
      </Link>

      <AuthBranding />
      <LoginForm />
    </div>
  );
}
