export interface StudentProfile {
  id: string;
  studentId: string;
  role: string;
  firstName: string;
  lastName: string;
  schoolClass: string;
  department: string;
  dateOfBirth: string;
  yearJoined: number;
  homeAddress: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  avatarUrl: string | null;
}

export interface ChangePasswordPayload {
  newPassword: string;
  confirmPassword: string;
}

export type UpdateStudentPayload = Partial<
  Omit<StudentProfile, 'id' | 'studentId' | 'role' | 'yearJoined'>
>;
