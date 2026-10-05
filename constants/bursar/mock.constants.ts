// TEMPORARY: placeholder data for the bursar UI until the fee endpoints exist.
import { mockStudents, promotionClasses } from "@/constants/admin/mock.constants";
import type { ClassBill, StudentFee } from "@/types/bursar.types";

export const currentTermLabel = "2025/2026 · 3rd Term";
export const nextTermLabel = "2026/2027 · 1st Term";

export const billTotal = (bill: ClassBill) =>
  bill.tuition + bill.ict + bill.otherCharges.reduce((sum, c) => sum + c.amount, 0);

export const naira = (n: number) => `₦${n.toLocaleString()}`;

// This term's bill — what each student was expected to pay.
export const currentBills: ClassBill[] = promotionClasses.map((className) => {
  const senior = className.startsWith("SS");
  return {
    className,
    tuition: senior ? 135000 : 115000,
    ict: senior ? 15000 : 12000,
    otherCharges: [{ id: `${className}-dev`, name: "Development levy", amount: 10000 }],
  };
});

// Next term's bill starts as a copy of this term's, for the bursar to adjust.
export const draftNextBills: ClassBill[] = currentBills.map((b) => ({
  ...b,
  otherCharges: b.otherCharges.map((c) => ({ ...c })),
}));

// Deterministic mix: roughly half cleared, the rest owing different amounts.
const owingPattern = [0, 45000, 0, 0, 20000, 0, 140000, 5000];

export const mockStudentFees: StudentFee[] = mockStudents
  .filter((s) => s.status === "active")
  .map((s, i) => ({ studentId: s.id, outstanding: owingPattern[i % owingPattern.length] }));
