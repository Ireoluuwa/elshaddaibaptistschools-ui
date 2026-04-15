import TeacherSidebar from "@/components/teacher/shared/TeacherSidebar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherSidebar />
      <main className="lg:pl-[260px] transition-all duration-300">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
