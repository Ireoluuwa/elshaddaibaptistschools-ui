export type StudentStatus = "active" | "graduated" | "withdrawn";
export type EnrollmentOutcome = "promoted" | "repeated" | "graduated" | "withdrawn";

export interface StudentListItem {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  className: string | null;
  department: string | null;
  status: StudentStatus;
}

export interface StudentEnrollment {
  session: string;
  isCurrentSession: boolean;
  className: string;
  department: string | null;
  outcome: EnrollmentOutcome | null;
}

export interface StudentDetail extends StudentListItem {
  enrollments: StudentEnrollment[];
}
