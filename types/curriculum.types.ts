export interface SchoolClass {
  id: string;
  name: string;
  isSenior: boolean;
}

export interface Department {
  id: string;
  name: string;
}

export interface ClassCurriculum {
  classId: string;
  className: string;
  isSenior: boolean;
  // Subjects every student in the class takes.
  common: string[];
  // Senior classes only: extra subjects per department.
  departments: (Department & { subjects: string[] })[];
}

export interface UpdateCurriculumPayload {
  common: string[];
  departments: { departmentId: string; subjects: string[] }[];
}
