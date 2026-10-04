// TEMPORARY: placeholder data for the admin UI until the admin endpoints exist.
// Replace each export with a React Query hook (see api-consumption.md).
import type {
  AdminSession,
  AdminStudent,
  AdminTeacher,
} from "@/types/admin.types";

export const promotionClasses = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
export const departments = ["Science", "Art", "Commercial"];

// Class a student moves into when promoted. null = graduates.
export const nextClass: Record<string, string | null> = {
  JSS1: "JSS2",
  JSS2: "JSS3",
  JSS3: "SS1",
  SS1: "SS2",
  SS2: "SS3",
  SS3: null,
};

export const mockSessions: AdminSession[] = [
  {
    id: "s-2025",
    name: "2025/2026",
    isCurrent: true,
    terms: [
      { id: "t-1", name: "1st Term", startDate: "2025-09-15", endDate: "2025-12-12", status: "closed" },
      { id: "t-2", name: "2nd Term", startDate: "2026-01-12", endDate: "2026-04-02", status: "closed" },
      { id: "t-3", name: "3rd Term", startDate: "2026-05-04", endDate: "2026-07-31", status: "closed" },
    ],
  },
  {
    id: "s-2024",
    name: "2024/2025",
    isCurrent: false,
    terms: [
      { id: "t-4", name: "1st Term", startDate: "2024-09-16", endDate: "2024-12-13", status: "closed" },
      { id: "t-5", name: "2nd Term", startDate: "2025-01-13", endDate: "2025-04-04", status: "closed" },
      { id: "t-6", name: "3rd Term", startDate: "2025-04-28", endDate: "2025-07-25", status: "closed" },
    ],
  },
];

const firstNames = ["Feranmi", "Tunde", "Ada", "Chinedu", "Aisha", "Temi", "Ifeoma", "Segun", "Zainab", "Kelechi", "Bisi", "Emeka"];
const lastNames = ["Adejumo", "Bello", "Chukwu", "Okafor", "Musa", "Adeyemi", "Eze", "Ogunleye", "Ibrahim", "Nwosu", "Balogun", "Obi"];

export const mockStudents: AdminStudent[] = promotionClasses.flatMap((className, ci) =>
  Array.from({ length: 8 }, (_, i) => {
    const n = ci * 8 + i;
    const isSenior = className.startsWith("SS");
    const department = isSenior ? departments[i % 3] : undefined;
    // Deterministic spread of averages; every 7th student has no results yet.
    const annualAverage = n % 7 === 6 ? null : 30 + ((n * 37) % 60);
    return {
      id: `stu-${n}`,
      username: `ESBS/${String(1001 + n)}`,
      firstName: firstNames[(n + ci) % firstNames.length],
      lastName: lastNames[n % lastNames.length],
      className,
      department,
      status: "active" as const,
      annualAverage,
      enrollments: [{ session: "2025/2026", className, department }],
    };
  }),
);

export const mockTeachers: AdminTeacher[] = [
  { id: "tch-1", username: "mrs.okafor", firstName: "Ngozi", lastName: "Okafor", email: "ngozi.okafor@esbs.ng", className: "JSS1", isActive: true },
  { id: "tch-2", username: "mr.bello", firstName: "Ibrahim", lastName: "Bello", email: "ibrahim.bello@esbs.ng", className: "JSS2", isActive: true },
  { id: "tch-3", username: "mrs.adeyemi", firstName: "Funke", lastName: "Adeyemi", className: "JSS3", isActive: true },
  { id: "tch-4", username: "mr.eze", firstName: "Chidi", lastName: "Eze", email: "chidi.eze@esbs.ng", className: "SS1", isActive: true },
  { id: "tch-5", username: "mrs.musa", firstName: "Hauwa", lastName: "Musa", className: "SS2", isActive: true },
  { id: "tch-6", username: "mr.ogun", firstName: "Dayo", lastName: "Ogunleye", isActive: true },
  { id: "tch-7", username: "mrs.nwosu", firstName: "Uche", lastName: "Nwosu", isActive: false },
];
