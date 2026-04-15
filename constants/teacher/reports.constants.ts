export const mockStudents = [
  { id: "S001", name: "Alice Johnson", class: "SS1 Science", status: "Pending" },
  { id: "S002", name: "Brian Smith", class: "SS1 Science", status: "Submitted" },
  { id: "S003", name: "Catherine Doe", class: "SS2 Art", status: "Pending" },
  { id: "S004", name: "David Williams", class: "SS1 Science", status: "Pending" },
  { id: "S005", name: "Emily Brown", class: "SS2 Commercial", status: "Submitted" },
];

export const behavioralRatings = [
  { value: 1, label: "Poor" },
  { value: 2, label: "Fair" },
  { value: 3, label: "Good" },
  { value: 4, label: "Very Good" },
  { value: 5, label: "Excellent" },
];

export const availableSubjects = [
  "Mathematics",
  "English Language",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Accounting",
];

export const mockPastReports: Record<string, any[]> = {
  S001: [
    {
      week: 1,
      rating: 3,
      description: "Alice has settled in fairly well this week. She is attentive but could participate more in class discussions.",
      testScores: [{ id: 1, subject: "Mathematics", score: "14", maxScore: "20" }],
    },
    {
      week: 2,
      rating: 4,
      description: "Much better participation this week. She asked several good questions during Physics.",
      testScores: [
        { id: 1, subject: "Mathematics", score: "17", maxScore: "20" },
        { id: 2, subject: "Physics", score: "8", maxScore: "10" },
      ],
    },
    {
      week: 3,
      rating: 2,
      description: "Alice seemed a bit distracted this week. Homework was submitted late.",
      testScores: [],
    },
    {
      week: 4,
      rating: 5,
      description: "Excellent turnaround! She aced the pop quiz and helped out group members during the lab session.",
      testScores: [{ id: 1, subject: "Chemistry", score: "20", maxScore: "20" }],
    },
  ],
};
