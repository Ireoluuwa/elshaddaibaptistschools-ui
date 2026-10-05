// TEMPORARY: placeholder data for the admin UI until the admin endpoints exist.
// Replace each export with a React Query hook (see api-consumption.md).
import type {
  AdminBursar,
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

// ── Term results (per student) ──────────────────────────────────────────────

export const juniorSubjects = [
  "English Language", "Mathematics", "Basic Science", "Basic Technology",
  "Social Studies", "Civic Education", "Christian Religious Studies",
  "Computer Studies", "Agricultural Science", "Home Economics", "Yoruba", "French",
];

export const seniorSubjects: Record<string, string[]> = {
  Science: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology", "Further Mathematics", "Civic Education", "Computer Studies", "Agricultural Science"],
  Art: ["English Language", "Mathematics", "Literature in English", "Government", "History", "Christian Religious Studies", "Civic Education", "Yoruba", "Economics"],
  Commercial: ["English Language", "Mathematics", "Economics", "Commerce", "Financial Accounting", "Office Practice", "Civic Education", "Computer Studies", "Marketing"],
};

const teacherRemarkFor = (avg: number) =>
  avg >= 70
    ? "An outstanding student. Hardworking and well behaved."
    : avg >= 55
      ? "A good student who participates well in class."
      : avg >= 40
        ? "Can do better with more attention to studies."
        : "Needs to be more serious and attentive in class.";

export interface MockTermResult {
  scores: { subjectName: string; test1: number; test2: number; exam: number }[];
  daysAttended: number;
  totalDays: number;
  teacherRemark: string;
}

// Deterministic scores spread around the student's average. null = no result entered.
export const mockTermResult = (student: AdminStudent): MockTermResult | null => {
  const avg = student.annualAverage;
  if (avg === null) return null;
  const seed = Number(student.id.replace(/\D/g, "")) || 0;
  const subjects = student.department ? seniorSubjects[student.department] : juniorSubjects;

  const scores = subjects.map((subjectName, i) => {
    const total = Math.min(98, Math.max(15, Math.round(avg + ((seed * 13 + i * 29) % 25) - 12)));
    const test1 = Math.min(20, Math.round(total * 0.2));
    const test2 = Math.min(20, Math.max(0, Math.round(total * 0.2) + ((seed + i) % 3) - 1));
    return { subjectName, test1, test2, exam: Math.min(60, total - test1 - test2) };
  });

  return {
    scores,
    daysAttended: 55 + (seed % 11),
    totalDays: 65,
    teacherRemark: teacherRemarkFor(avg),
  };
};

export const mockBursars: AdminBursar[] = [
  { id: "bur-1", username: "bursar.adebayo", firstName: "Kemi", lastName: "Adebayo", email: "kemi.adebayo@esbs.ng", phoneNumber: "0803 123 4567", status: "active", lastSignIn: "2026-10-03", invitedAt: "2025-09-01" },
  { id: "bur-2", username: "bursar.okon", firstName: "Emmanuel", lastName: "Okon", phoneNumber: "0812 987 6543", status: "invited", invitedAt: "2026-09-28" },
];

// ── Curriculum (which subjects each class takes) ────────────────────────────

// Key for subjects every student in a class takes, whatever their department.
export const ALL_DEPARTMENTS = "All departments";

export interface SchoolClassInfo {
  name: string;
  isSenior: boolean;
}

export const mockClasses: SchoolClassInfo[] = promotionClasses.map((name) => ({
  name,
  isSenior: name.startsWith("SS"),
}));

// Subjects every senior student takes; the rest depend on their department.
const seniorCore = ["English Language", "Mathematics", "Civic Education"];

// curriculum[className][department or ALL_DEPARTMENTS] = subjects
export const mockCurriculum: Record<string, Record<string, string[]>> = Object.fromEntries(
  mockClasses.map((c) => [
    c.name,
    c.isSenior
      ? {
          [ALL_DEPARTMENTS]: [...seniorCore],
          ...Object.fromEntries(
            departments.map((d) => [d, seniorSubjects[d].filter((s) => !seniorCore.includes(s))]),
          ),
        }
      : { [ALL_DEPARTMENTS]: [...juniorSubjects] },
  ]),
);

// Every subject the school offers, for suggestions when adding one.
export const allSubjects = Array.from(
  new Set([...juniorSubjects, ...Object.values(seniorSubjects).flat()]),
).sort();
