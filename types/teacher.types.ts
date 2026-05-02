export interface TeacherProfile {
  id: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  schoolClass: string;
  department: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export type UpdateTeacherPayload = Partial<
  Omit<TeacherProfile, 'id' | 'username' | 'role' | 'schoolClass' | 'department'>
>;
