import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function BursarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="bursar">
      <div className="min-h-screen bg-canvas">
        <AdminSidebar portal="bursar" />
        <main className="lg:pl-[260px] transition-all duration-300">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </RoleGuard>
  );
}
