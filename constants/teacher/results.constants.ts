export const academicYears = ["2025/2026", "2024/2025", "2023/2024"];

export const terms = ["1st Term", "2nd Term", "3rd Term"];

export const currentSession = {
  year: "2025/2026",
  term: "2nd Term",
};

export const resultSubjects = [
  "Mathematics",
  "English Language",
  "Physics",
  "Chemistry",
  "Biology",
  "Further Mathematics",
  "Economics",
  "Government",
  "Literature in English",
  "Civic Education",
  "Computer Science",
  "Agricultural Science",
  "Financial Accounting",
  "Commerce",
  "Christian Religious Studies",
  "Islamic Religious Studies",
  "French",
  "Yoruba",
  "Igbo",
  "Hausa",
  "Technical Drawing",
  "Fine Art",
  "Music",
  "Physical Education",
  "Home Economics",
];

export const gradeMap = (total: number): { grade: string; remark: string } => {
  if (total >= 70) return { grade: "A", remark: "Excellent" };
  if (total >= 60) return { grade: "B", remark: "Very Good" };
  if (total >= 50) return { grade: "C", remark: "Good" };
  if (total >= 45) return { grade: "D", remark: "Fair" };
  if (total >= 40) return { grade: "E", remark: "Pass" };
  return { grade: "F", remark: "Fail" };
};

export interface ResultScore {
  id: number;
  subject: string;
  test1: string;
  test2: string;
  exam: string;
}

export interface MockResult {
  year: string;
  term: string;
  scores: ResultScore[];
  daysAttended: string;
  totalDays: string;
}

export const mockResults: Record<string, MockResult[]> = {
  S001: [
    {
      year: "2025/2026",
      term: "1st Term",
      daysAttended: "58",
      totalDays: "65",
      scores: [
        { id: 1, subject: "Mathematics", test1: "12", test2: "13", exam: "55" },
        { id: 2, subject: "English Language", test1: "10", test2: "11", exam: "50" },
        { id: 3, subject: "Physics", test1: "14", test2: "12", exam: "60" },
      ],
    },
  ],
  S002: [
    {
      year: "2025/2026",
      term: "1st Term",
      daysAttended: "60",
      totalDays: "65",
      scores: [
        { id: 1, subject: "Mathematics", test1: "8", test2: "10", exam: "40" },
        { id: 2, subject: "English Language", test1: "12", test2: "14", exam: "58" },
      ],
    },
  ],
};
