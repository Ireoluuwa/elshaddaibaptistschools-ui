export type PromotionOutcome = "promoted" | "repeated" | "graduated" | "withdrawn";

export interface ClassRef {
  id: string;
  name: string;
  isSenior: boolean;
}

export interface ClassPromotionProgress {
  classId: string;
  className: string;
  isSenior: boolean;
  // null = students graduate from this class.
  nextClass: ClassRef | null;
  students: number;
  decided: number;
  done: boolean;
}

export interface PromotionSummary {
  session: { id: string; name: string };
  classes: ClassPromotionProgress[];
}

export interface PromotionStudent {
  studentId: string;
  username: string;
  firstName: string;
  lastName: string;
  department: string | null;
  // Average of the session's term results; null when none entered.
  average: number | null;
  termsCounted: number;
  outcome: PromotionOutcome | null;
  nextDepartmentId: string | null;
}

export interface ClassPromotion {
  session: { id: string; name: string };
  classId: string;
  className: string;
  nextClass: ClassRef | null;
  needsDepartment: boolean;
  students: PromotionStudent[];
}

export interface PromotionDecision {
  studentId: string;
  outcome: PromotionOutcome;
  departmentId?: string;
}
