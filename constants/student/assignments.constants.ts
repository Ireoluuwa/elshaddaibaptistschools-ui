export type StudentAssignmentStatus = "Pending" | "Submitted" | "Overdue";

export interface StudentAssignment {
  id: string;
  title: string;
  teacher: string;
  subject: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: StudentAssignmentStatus;
  hasAttachment: boolean;
  score?: string;
}

export const mockStudentAssignments: StudentAssignment[] = [
  {
    id: "a1",
    title: "Algebraic Equations Worksheet",
    teacher: "Mr. Johnson",
    subject: "Mathematics",
    description:
      "Please complete the attached worksheet covering linear equations and basic inequalities. Show all workings clearly on standard lined paper before scanning and uploading.",
    startDate: "Oct 12, 2024",
    dueDate: "Oct 15, 2024",
    status: "Pending",
    hasAttachment: true,
  },
  {
    id: "a2",
    title: "Photosynthesis Diagram Analysis",
    teacher: "Mrs. Smith",
    subject: "Biology",
    description:
      "Review the provided diagram on the light-dependent reactions of photosynthesis. Write a short essay explaining the role of chlorophyll and ATP synthesis.",
    startDate: "Oct 10, 2024",
    dueDate: "Oct 14, 2024",
    status: "Submitted",
    hasAttachment: false,
    score: "9/10",
  },
  {
    id: "a3",
    title: "The Causes of the Civil War",
    teacher: "Mr. Adams",
    subject: "History",
    description:
      "Read chapters 3 and 4 of the textbook. Write a 500-word analysis on the economic divergence between the Northern and Southern economic systems prior to the war outbreak.",
    startDate: "Sep 28, 2024",
    dueDate: "Oct 05, 2024",
    status: "Overdue",
    hasAttachment: true,
  },
  {
    id: "a4",
    title: "Periodic Table Memorization Quiz",
    teacher: "Ms. Lee",
    subject: "Chemistry",
    description:
      "This is a reminder to memorize the first 20 elements of the periodic table. The attached study guide provides helpful mnemonics. No submission required, prepare for the live quiz.",
    startDate: "Oct 15, 2024",
    dueDate: "Oct 20, 2024",
    status: "Pending",
    hasAttachment: true,
  },
];

export const studentStatusOptions = ["All Statuses", "Pending", "Submitted", "Overdue"];
