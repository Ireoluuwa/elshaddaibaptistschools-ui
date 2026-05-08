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
  {
    id: "A005",
    title: "Chemistry: Acid-Base Titration",
    description: "Submit the calculation sheet for titration experiment",
    startDate: "Nov 01, 2025",
    dueDate: "Nov 05, 2025",
    status: "Active",
    hasAttachment: true,
  },
  {
    id: "A006",
    title: "Economics: Market Structures",
    description: "Create a presentation on Monopoly and Oligopoly",
    startDate: "Nov 02, 2025",
    dueDate: "Nov 08, 2025",
    status: "Draft",
    hasAttachment: false,
  },
  {
    id: "A007",
    title: "Geography: Climate Change",
    description: "Research local climate changes over the last decade",
    startDate: "Oct 28, 2025",
    dueDate: "Nov 04, 2025",
    status: "Active",
    hasAttachment: true,
  },
  {
    id: "A008",
    title: "Further Maths: Integration",
    description: "Advanced calculus problems on definite integrals",
    startDate: "Oct 25, 2025",
    dueDate: "Oct 29, 2025",
    status: "Past Due",
    hasAttachment: false,
  },
  {
    id: "A009",
    title: "Agric Science: Crop Rotation",
    description: "Diagram of a 4-year crop rotation system",
    startDate: "Nov 03, 2025",
    dueDate: "Nov 10, 2025",
    status: "Active",
    hasAttachment: true,
  },
  {
    id: "A010",
    title: "Government: Constitutional Law",
    description: "Comparison of presidential and parliamentary systems",
    startDate: "Oct 30, 2025",
    dueDate: "Nov 06, 2025",
    status: "Draft",
    hasAttachment: false,
  },
  {
    id: "A011",
    title: "History: African Empires",
    description: "Timeline of the Mali and Songhai empires",
    startDate: "Oct 27, 2025",
    dueDate: "Oct 30, 2025",
    status: "Past Due",
    hasAttachment: false,
  },
  {
    id: "A012",
    title: "Technical Drawing: Orthographic",
    description: "First angle projection of a complex block",
    startDate: "Nov 05, 2025",
    dueDate: "Nov 12, 2025",
    status: "Active",
    hasAttachment: true,
  },
];

export const statusOptions = ["All Statuses", "Active", "Past Due", "Draft"];
