export interface WeeklyReportDetail {
  id: string;
  week: number;
  term: string;
  year: string;
  behavioralRating: number;
  teacherComments: string;
  testScores: {
    subject: string;
    score: number;
    maxScore: number;
    grade: string;
  }[];
  dateGenerated: string;
}

export const mockWeeklyReports: WeeklyReportDetail[] = [
  {
    id: "week-1",
    week: 1,
    term: "First Term",
    year: "2024/2025",
    behavioralRating: 4,
    teacherComments: "Favour has started the term with great enthusiasm. Her participation in class discussions has improved significantly.",
    testScores: [
      { subject: "Mathematics", score: 14, maxScore: 15, grade: "A" },
      { subject: "English Language", score: 12, maxScore: 15, grade: "B" },
      { subject: "Basic Science", score: 13, maxScore: 15, grade: "A" }
    ],
    dateGenerated: "Sept 15, 2024"
  },
  {
    id: "week-2",
    week: 2,
    term: "First Term",
    year: "2024/2025",
    behavioralRating: 5,
    teacherComments: "Excellent performance this week. She was very helpful during the group project.",
    testScores: [
      { subject: "Mathematics", score: 15, maxScore: 15, grade: "A+" },
      { subject: "English Language", score: 14, maxScore: 15, grade: "A" },
      { subject: "Agricultural Science", score: 14, maxScore: 15, grade: "A" }
    ],
    dateGenerated: "Sept 22, 2024"
  }
];

export const academicYears = ["2023/2024", "2024/2025"];
export const academicTerms = ["First Term", "Second Term", "Third Term"];
export const totalWeeks = 12;
