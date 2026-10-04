import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="admin">
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="lg:pl-[260px] transition-all duration-300">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </RoleGuard>
  );
}
