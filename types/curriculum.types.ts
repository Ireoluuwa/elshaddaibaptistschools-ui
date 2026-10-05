export interface SchoolClass {
  id: string;
  name: string;
  isSenior: boolean;
  // Where promoted students go; null = students graduate from this class.
  nextClassId: string | null;
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
