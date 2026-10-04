import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

const skipRoleCheck = process.env.NODE_ENV === "development";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:pl-[260px] transition-all duration-300">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );

  if (skipRoleCheck) return content;

  return <RoleGuard allowedRole="admin">{content}</RoleGuard>;
}
