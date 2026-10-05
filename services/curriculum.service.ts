import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type {
  ClassCurriculum,
  Department,
  SchoolClass,
  UpdateCurriculumPayload,
} from '@/types/curriculum.types';

export const curriculumService = {
  getClasses: async (): Promise<SchoolClass[]> => {
    const { data } = await api.get<ApiResponse<SchoolClass[]>>('/academics/classes');
    return data.data;
  },

  addClass: async (payload: { name: string; isSenior: boolean }): Promise<SchoolClass> => {
    const { data } = await api.post<ApiResponse<SchoolClass>>('/academics/classes', payload);
    return data.data;
  },

  getDepartments: async (): Promise<Department[]> => {
    const { data } = await api.get<ApiResponse<Department[]>>('/academics/departments');
    return data.data;
  },

  addDepartment: async (name: string): Promise<Department> => {
    const { data } = await api.post<ApiResponse<Department>>('/academics/departments', { name });
    return data.data;
  },

  removeDepartment: async (id: string): Promise<void> => {
    await api.delete(`/academics/departments/${id}`);
  },

  getSubjectCatalog: async (): Promise<string[]> => {
    const { data } = await api.get<ApiResponse<string[]>>('/academics/subjects/catalog');
    return data.data;
  },

  getCurriculum: async (classId: string): Promise<ClassCurriculum> => {
    const { data } = await api.get<ApiResponse<ClassCurriculum>>(`/academics/curriculum/${classId}`);
    return data.data;
  },

  saveCurriculum: async (classId: string, payload: UpdateCurriculumPayload): Promise<ClassCurriculum> => {
    const { data } = await api.put<ApiResponse<ClassCurriculum>>(`/academics/curriculum/${classId}`, payload);
    return data.data;
  },
};
