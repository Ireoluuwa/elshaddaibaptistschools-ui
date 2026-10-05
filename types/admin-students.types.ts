export type StudentStatus = "active" | "graduated" | "removed";
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

// Missing details come back as null.
export interface StudentDetail extends StudentListItem {
  dateOfBirth: string | null;
  yearJoined: number | null;
  homeAddress: string | null;
  guardianName: string | null;
  guardianPhone: string | null;
  guardianEmail: string | null;
  avatarUrl: string | null;
  enrollments: StudentEnrollment[];
}
