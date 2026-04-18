export const schoolBankDetails = {
  bankName: "Zenith Bank PLC",
  accountName: "El-Shaddai Baptist Schools",
  accountNumber: "1012345678",
  paymentReference: "ESBS-PAY-001"
};

export const currentFinanceSummary = {
  termTotal: 155000,
  amountPaid: 80000,
  pendingBalance: 75000,
  currency: "₦"
};

export const feeBreakdown = [
  { item: "Tuition Fee", amount: 120000 },
  { item: "Library & ICT", amount: 15000 },
  { item: "Sports & Games", amount: 5000 },
  { item: "Development Levy", amount: 10000 },
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
}

export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: "pay-001",
    date: "Jan 12, 2024",
    amount: 50000,
    method: "Bank Transfer",
    status: "Approved"
  },
  {
    id: "pay-002",
    date: "Feb 05, 2024",
    amount: 30000,
    method: "Bank Transfer",
    status: "Approved"
  }
];
