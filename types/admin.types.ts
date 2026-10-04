export type TermStatus = "upcoming" | "active" | "closed";

export interface AdminTerm {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: TermStatus;
}

export interface AdminSession {
  id: string;
  name: string;
  isCurrent: boolean;
  terms: AdminTerm[];
}

export type StudentStatus = "active" | "graduated" | "withdrawn";

export interface Enrollment {
  session: string;
  className: string;
  department?: string;
  outcome?: "promoted" | "repeated" | "graduated" | "withdrawn";
}

export interface AdminStudent {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  className: string;
  department?: string;
  status: StudentStatus;
  annualAverage: number | null;
  enrollments: Enrollment[];
}

export interface AdminTeacher {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  className?: string;
  isActive: boolean;
}

export type PromotionDecision = "promote" | "repeat" | "graduate" | "withdraw";
