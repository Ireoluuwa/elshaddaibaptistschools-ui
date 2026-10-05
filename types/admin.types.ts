export type TermStatus = "upcoming" | "active" | "closed";

// Filled in once per term by the admin; printed on every student's report sheet.
// (The V.P's remark is per student — it lives on the result, not here.)
export interface TermReportDetails {
  signatureUrl: string;
  signedDate: string;
  vacationDate: string;
  resumptionDate: string;
}

export interface AdminTerm {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: TermStatus;
  reportDetails?: TermReportDetails;
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

export type BursarStatus = "invited" | "active" | "disabled";

export interface AdminBursar {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  status: BursarStatus;
  // ISO date; undefined until they first sign in.
  lastSignIn?: string;
  invitedAt: string;
}
