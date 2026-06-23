export interface TerminalResultScore {
  subjectName: string;
  test1: number;
  test2: number;
  exam: number;
}

export interface UpsertResultPayload {
  studentId: string;
  termId: string;
  scores: TerminalResultScore[];
  daysAttended: number;
  totalDays: number;
  teacherRemark?: string;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface BulkUpsertResultPayload {
  results: UpsertResultPayload[];
}

export interface TerminalResult {
  id: string;
  scores: TerminalResultScore[];
  daysAttended: number;
  totalDays: number;
  teacherRemark?: string;
  status: 'DRAFT' | 'PUBLISHED';
  term?: {
    id: string;
    name: string;
    academicYear: { name: string };
  };
}

export interface ResultsDashboardInitData {
  activePeriod: {
    termId: string | null;
    yearId: string | null;
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
  periods: {
    id: string;
    name: string;
    terms: { id: string; name: string; isCurrent: boolean }[];
  }[];
}

export interface StudentResultData {
  student: {
    id: string;
    name: string;
    class: string;
    studentId: string;
    classId: string | null;
    departmentId: string | null;
  };
  result: TerminalResult | null;
}

export interface MyResultData {
  periods: {
    id: string;
    name: string;
    terms: { id: string; name: string; isCurrent: boolean }[];
  }[];
  activeTermId: string | null;
  selectedTermId: string | null;
  student: {
    name: string;
    class: string;
    studentId: string;
  } | null;
  result: TerminalResult | null;
}

export interface SubjectOption {
  id: string;
  name: string;
}

export interface BulkUploadError {
  studentId: string;
  studentName: string;
  subjectName: string;
  expected: string;
}
