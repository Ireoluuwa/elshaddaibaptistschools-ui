import type { TermStatus } from "@/types/session.types";

export interface BursaryTerm {
  id: string;
  label: string;
  status: TermStatus;
}

export interface BillCharge {
  name: string;
  amount: number;
}

// Next term's fees for a class, printed on this term's report sheets.
export interface ClassBill {
  classId: string;
  className: string;
  isSenior: boolean;
  saved: boolean;
  tuition: number;
  ict: number;
  otherCharges: BillCharge[];
  total: number;
}

export interface BillsResponse {
  term: BursaryTerm;
  classes: ClassBill[];
}

export interface SaveBillPayload {
  tuition: number;
  ict: number;
  otherCharges: BillCharge[];
}

export interface BursaryOverview {
  term: BursaryTerm;
  outstanding: number;
  owing: number;
  classes: { classId: string; className: string; students: number; owing: number; outstanding: number }[];
}

export interface StudentBalance {
  studentId: string;
  username: string;
  firstName: string;
  lastName: string;
  department: string | null;
  outstanding: number;
}

export interface FeesResponse {
  term: BursaryTerm;
  students: StudentBalance[];
}
