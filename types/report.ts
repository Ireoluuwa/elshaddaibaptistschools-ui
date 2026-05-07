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
  activePeriod: {
    termId: string | null;
    yearId: string | null;
    week: number;
  };
  classInfo: {
    id: string;
    name: string;
  };
  students: {
    id: string;
    name: string;
    studentId: string;
  }[];
  periods: any[];
}

export interface StudentHistoryData {
  student: {
    id: string;
    name: string;
    class: string;
    studentId: string;
    classId?: string;
    departmentId?: string | null;
  };
  timeline: {
    week: number;
    reportId: string | null;
    status: string;
  }[];
  activeReport: WeeklyReport | null;
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
  studentId?: string;
  classId?: string;
  departmentId?: string | null;
  status?: string;
}

export interface ReportFormProps {
  student: Student;
  classId?: string;
  departmentId?: string | null;
  isHistoryView?: boolean;
  initialData?: {
    rating: number;
    description: string;
    testScores: TestScore[];
  };
}
