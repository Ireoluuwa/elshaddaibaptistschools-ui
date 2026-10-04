// Sample data for previewing the report sheet locally: /report-sheet?preview=1
import type { StudentResultData } from "@/types/result";

export const previewResult: StudentResultData = {
  student: {
    id: "preview",
    name: "Adejumo Feranmi",
    class: "JSS 2",
    studentId: "ESBS/1001",
    classId: null,
    departmentId: null,
    teacherName: "Mrs. Ngozi Okafor",
  },
  result: {
    id: "preview",
    status: "PUBLISHED",
    daysAttended: 61,
    totalDays: 65,
    teacherRemark:
      "Feranmi is a diligent and well-behaved student. Keep up the good work.",
    term: {
      id: "preview",
      name: "3rd Term",
      academicYear: { name: "2025/2026" },
    },
    scores: [
      { subjectName: "English Language", test1: 16, test2: 17, exam: 52 },
      { subjectName: "Mathematics", test1: 18, test2: 15, exam: 48 },
      { subjectName: "Basic Science", test1: 14, test2: 16, exam: 45 },
      { subjectName: "Basic Technology", test1: 12, test2: 13, exam: 38 },
      { subjectName: "Social Studies", test1: 17, test2: 18, exam: 55 },
      { subjectName: "Civic Education", test1: 15, test2: 14, exam: 47 },
      { subjectName: "Christian Religious Studies", test1: 19, test2: 18, exam: 58 },
      { subjectName: "Computer Studies", test1: 13, test2: 15, exam: 41 },
      { subjectName: "Agricultural Science", test1: 11, test2: 12, exam: 33 },
      { subjectName: "Home Economics", test1: 16, test2: 15, exam: 44 },
      { subjectName: "Yoruba", test1: 9, test2: 10, exam: 26 },
      { subjectName: "French", test1: 12, test2: 11, exam: 35 },
    ],
  },
};
