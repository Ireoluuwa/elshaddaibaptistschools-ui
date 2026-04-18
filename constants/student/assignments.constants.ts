export interface StudentAssignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Overdue";
  attachment?: {
    name: string;
    url: string;
    size: string;
  };
}

export const studentAssignments: StudentAssignment[] = [
  {
    id: "1",
    title: "Quadratic Equations Worksheet",
    subject: "Mathematics",
    description: "Please complete all 20 problems in the attached worksheet. Show all your workings for each step to receive full marks.",
    startDate: "Oct 12, 2024",
    dueDate: "Oct 19, 2024",
    status: "Pending",
    attachment: {
      name: "Math_Quadratic_WS.pdf",
      url: "#",
      size: "1.2 MB"
    }
  },
  {
    id: "2",
    title: "Macbeth Act 1 Analysis",
    subject: "English Language",
    description: "Write a 500-word analysis of Lady Macbeth's monologue in Act 1, Scene 5. Focus on the use of metaphor and imagery.",
    startDate: "Oct 10, 2024",
    dueDate: "Oct 15, 2024",
    status: "Submitted",
  },
  {
    id: "3",
    title: "Newton's Laws Lab Report",
    subject: "Physics",
    description: "Submit your findings from the lab experiment conducted on Tuesday. Include your data tables, graphs, and a 200-word conclusion.",
    startDate: "Oct 01, 2024",
    dueDate: "Oct 08, 2024",
    status: "Overdue",
    attachment: {
      name: "Lab_Template.docx",
      url: "#",
      size: "450 KB"
    }
  },
  {
    id: "4",
    title: "West African Trade Routes",
    subject: "History",
    description: "Draw a map showing the trans-saharan trade routes and write a brief summary of the major commodities traded.",
    startDate: "Oct 15, 2024",
    dueDate: "Oct 22, 2024",
    status: "Pending",
  }
];
