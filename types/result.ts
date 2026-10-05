import type { TermReportDetails } from "./admin.types";
import type { ReportFees } from "./bursar.types";

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
  vpRemark?: string;
  // Set by the bursar. Students with outstanding > 0 can't view this result.
  fees?: ReportFees;
  status: 'DRAFT' | 'PUBLISHED';
  term?: {
    id: string;
    name: string;
    academicYear: { name: string };
    reportDetails?: TermReportDetails;
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
    teacherName?: string | null;
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
    teacherName: string | null;
  } | null;
  result: TerminalResult | null;
  // Set when the student owes fees for the term; the result is withheld.
  feesHold?: { outstanding: number } | null;
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
