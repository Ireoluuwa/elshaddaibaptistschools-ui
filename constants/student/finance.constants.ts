// TEMPORARY: sample data until the finance endpoints exist.
export const schoolBankDetails = {
  bankName: "Zenith Bank PLC",
  accountName: "El-Shaddai Baptist Schools",
  accountNumber: "1012345678",
  paymentReference: "ESBS-PAY-001"
};

export const currentFinanceSummary = {
  session: "2025/2026",
  term: "3rd Term",
  dueDate: "2026-06-15",
  termTotal: 155000,
  amountPaid: 80000,
  pendingBalance: 75000,
  currency: "₦"
};

export const feeBreakdown = [
  { item: "Tuition Fee", amount: 120000 },
  { item: "Library & ICT", amount: 15000 },
  { item: "Development Levy", amount: 10000 },
  { item: "Sports & Games", amount: 5000 },
  { item: "Medical Services", amount: 5000 }
];

export interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "Approved" | "Verification Pending" | "Rejected";
  currency?: string;
  receiptUrl?: string;
  note?: string;
}

export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: "pay-003",
    date: "2026-05-28",
    amount: 25000,
    method: "Bank Transfer",
    status: "Verification Pending"
  },
  {
    id: "pay-002",
    date: "2026-05-11",
    amount: 30000,
    method: "Bank Transfer",
    status: "Approved"
  },
  {
    id: "pay-004",
    date: "2026-05-09",
    amount: 30000,
    method: "Bank Transfer",
    status: "Rejected",
    note: "Receipt was unreadable. Please upload a clearer copy."
  },
  {
    id: "pay-001",
    date: "2026-05-04",
    amount: 50000,
    method: "Bank Transfer",
    status: "Approved"
  }
];
