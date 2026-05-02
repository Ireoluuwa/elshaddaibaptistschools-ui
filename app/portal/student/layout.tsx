import StudentSidebar from "@/components/student/shared/StudentSidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="student">
      <div className="min-h-screen bg-gray-50">
        <StudentSidebar />
        <main className="lg:pl-[260px] transition-all duration-300">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </RoleGuard>
  );
}
