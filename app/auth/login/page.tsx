import AuthBranding from "@/components/auth/AuthBranding";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <AuthBranding />
      <LoginForm />
    </div>
  );
}
