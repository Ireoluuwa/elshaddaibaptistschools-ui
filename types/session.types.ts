export type TermStatus = "upcoming" | "active" | "closed";

export const TERM_NAMES = ["1st Term", "2nd Term", "3rd Term"] as const;
export type TermName = (typeof TERM_NAMES)[number];

// Printed on every report sheet for the term.
export interface TermReportDetails {
  signatureUrl: string | null;
  signedDate: string | null;
  vacationDate: string | null;
  resumptionDate: string | null;
}

export interface Term {
  id: string;
  name: TermName;
  startDate: string;
  endDate: string;
  status: TermStatus;
  reportDetails: TermReportDetails | null;
}

export interface Session {
  id: string;
  name: string;
  isCurrent: boolean;
  terms: Term[];
}

export interface CreateTermPayload {
  name: TermName;
  startDate: string;
  endDate: string;
  makeActive?: boolean;
}

export interface CreateSessionPayload {
  name: string;
  firstTerm: CreateTermPayload;
}

export type UpdateReportDetailsPayload = Partial<TermReportDetails>;
