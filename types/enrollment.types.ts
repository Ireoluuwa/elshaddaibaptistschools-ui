// Returned once when a student is created; the password isn't stored in plain text.
export interface CreatedStudent {
  id: string;
  firstName: string;
  lastName: string;
  className: string;
  department: string | null;
  username: string;
  password: string;
}

export interface EnrollStudentPayload {
  firstName: string;
  lastName: string;
  classId: string;
  departmentId?: string;
}
