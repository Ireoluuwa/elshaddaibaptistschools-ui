export interface TeacherAccount {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  classId: string | null;
  className: string | null;
  isActive: boolean;
  lastLoginAt: string | null;
}

export type BursarStatus = "invited" | "active" | "removed";

export interface BursarAccount {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  status: BursarStatus;
  lastLoginAt: string | null;
  invitedAt: string;
}

export interface CreateStaffPayload {
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  phoneNumber?: string;
}
