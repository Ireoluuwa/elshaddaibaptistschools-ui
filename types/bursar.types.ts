export interface BillCharge {
  id: string;
  name: string;
  amount: number;
}

// What each student in a class pays for a term.
// Tuition and I.C.T have their own lines on the report sheet; other charges
// are added into the "Next Term Tuition" line.
export interface ClassBill {
  className: string;
  tuition: number;
  ict: number;
  otherCharges: BillCharge[];
}

export interface StudentFee {
  studentId: string;
  outstanding: number;
}

// Printed in the fee line at the bottom of the report sheet.
export interface ReportFees {
  outstanding: number;
  nextTermTuition: number;
  ict: number;
}
