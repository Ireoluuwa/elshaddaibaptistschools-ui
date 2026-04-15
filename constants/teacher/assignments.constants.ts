export interface Assignment {
  id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: "Active" | "Past Due" | "Draft";
  hasAttachment: boolean;
}

export const mockAssignments: Assignment[] = [
  {
    id: "A001",
    title: "Physics Project: Motion",
    description: "Prepare a report on Newton's laws of motion",
    startDate: "Oct 24, 2025",
    dueDate: "Oct 31, 2025",
    status: "Active",
    hasAttachment: true,
  },
  {
    id: "A002",
    title: "Math Homework: Algebra",
    description: "Complete exercises 1-20 on page 45",
    startDate: "Oct 22, 2025",
    dueDate: "Oct 25, 2025",
    status: "Past Due",
    hasAttachment: false,
  },
  {
    id: "A003",
    title: "English Essay: Literature",
    description: "Write a 500-word essay on Shakespeare",
    startDate: "Oct 26, 2025",
    dueDate: "Nov 02, 2025",
    status: "Active",
    hasAttachment: true,
  },
  {
    id: "A004",
    title: "Biology Lab Report",
    description: "Document findings from the microscope lab",
    startDate: "Oct 20, 2025",
    dueDate: "Oct 23, 2025",
    status: "Past Due",
    hasAttachment: false,
  },
];

export const statusOptions = ["All Statuses", "Active", "Past Due", "Draft"];
