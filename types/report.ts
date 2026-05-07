export interface WeeklyScore {
  subjectName: string;
  score: number;
  total: number;
}

export interface ReportPayload {
  studentId: string;
  termId: string;
  weekNumber: number;
  scores: WeeklyScore[];
  behavioralScore: number;
  attendance: number;
  teacherRemark: string;
  status: 'draft' | 'submitted';
}

export interface WeeklyReport {
  id: string;
  weekNumber: number;
  status: 'draft' | 'submitted';
  scores: WeeklyScore[];
  behavioralScore: number;
  attendance: number;
  teacherRemark?: string;
}

export interface DashboardInitData {
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    schoolClass: {
      id: string;
      name: string;
    };
  };
  students: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }[];
  currentTerm: {
    id: string;
    name: string;
    currentWeek: number;
  };
}

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
