export type ResultStatus = "DRAFT" | "PUBLISHED";

export interface SubjectScore {
  subjectName: string;
  test1: number;
  test2: number;
  exam: number;
}

export interface ClassProgress {
  classId: string;
  className: string;
  students: number;
  entered: number;
  published: number;
}

export interface StudentTermResult {
  id: string;
  status: ResultStatus;
  scores: SubjectScore[];
  daysAttended: number;
  totalDays: number;
  teacherRemark: string | null;
  vpRemark: string | null;
}

export interface ClassResultRow {
  studentId: string;
  username: string;
  firstName: string;
  lastName: string;
  department: string | null;
  // null = not entered yet.
  result: StudentTermResult | null;
}
