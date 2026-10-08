// Sample data for previewing the report sheet locally: /report-sheet?preview=1
import type { MyResultData, StudentResultData } from "@/types/result";

// A hand-drawn-looking squiggle so the preview shows where the signature sits.
const sampleSignature =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><path d="M5 30 C15 5, 25 5, 22 28 S40 10, 48 24 S62 34, 70 14 S88 30, 96 18 L115 12" fill="none" stroke="#1a3a8a" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  );

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
    vpRemark: "A good result. Keep it up.",
    fees: { outstanding: 0, nextTermTuition: 125000, ict: 12000 },
    promotion: { outcome: "promoted", nextClass: "JSS3" },
    term: {
      id: "preview",
      name: "3rd Term",
      academicYear: { name: "2025/2026" },
      reportDetails: {
        signatureUrl: sampleSignature,
        signedDate: "2026-07-31",
        vacationDate: "2026-07-31",
        resumptionDate: "2026-09-14",
      },
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

// Same student, but owing fees: the server withholds the result. /report-sheet?preview=owing
export const previewOwingResult: MyResultData = {
  periods: [{ id: "preview-year", name: "2025/2026", terms: [{ id: "preview", name: "3rd Term", isCurrent: true }] }],
  activeTermId: "preview",
  selectedTermId: "preview",
  student: { name: "Adejumo Feranmi", class: "JSS 2", studentId: "ESBS/1001", teacherName: "Mrs. Ngozi Okafor" },
  result: null,
  feesHold: { outstanding: 45000 },
};
