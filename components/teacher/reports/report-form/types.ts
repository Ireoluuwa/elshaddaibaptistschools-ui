export interface TestScore {
  id: number;
  subject: string;
  score: string;
  maxScore: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  status?: string;
}

export interface ReportFormProps {
  student: Student;
  isHistoryView?: boolean;
  initialData?: {
    rating: number;
    description: string;
    testScores: TestScore[];
  };
}
