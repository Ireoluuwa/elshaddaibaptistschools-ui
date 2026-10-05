export interface TeacherAccount {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  avatarUrl: string | null;
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

// Only changed fields are sent; null clears an optional one.
export interface UpdateStaffPayload {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
}
