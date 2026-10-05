import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

// TEMPORARY: no bursar accounts exist yet, so skip the role check in local dev
// to allow previewing the bursar UI. Remove once a bursar user is seeded.
const skipRoleCheck = process.env.NODE_ENV === "development";

export default function BursarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <div className="min-h-screen bg-canvas">
      <AdminSidebar portal="bursar" />
      <main className="lg:pl-[260px] transition-all duration-300">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );

  if (skipRoleCheck) return content;

  return <RoleGuard allowedRole="bursar">{content}</RoleGuard>;
}
