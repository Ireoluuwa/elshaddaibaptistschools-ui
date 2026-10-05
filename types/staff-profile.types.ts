export const STAFF_TITLES = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Pastor", "Rev"] as const;

// Admin or bursar profile.
export interface StaffProfile {
  username: string;
  role: "admin" | "bursar";
  title: string | null;
  firstName: string;
  lastName: string;
  position: string | null;
  email: string | null;
  phoneNumber: string | null;
  signatureUrl: string | null;
}

// Only changed fields are sent; null clears an optional one.
export type UpdateStaffProfilePayload = Partial<Omit<StaffProfile, "username" | "role">>;
