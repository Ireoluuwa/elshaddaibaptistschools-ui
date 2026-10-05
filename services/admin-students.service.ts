import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type { StudentDetail, StudentListItem } from '@/types/admin-students.types';

export const adminStudentsService = {
  getAll: async (): Promise<StudentListItem[]> => {
    const { data } = await api.get<ApiResponse<StudentListItem[]>>('/admin/students');
    return data.data;
  },

  getOne: async (id: string): Promise<StudentDetail> => {
    const { data } = await api.get<ApiResponse<StudentDetail>>(`/admin/students/${id}`);
    return data.data;
  },

  setPassword: async (id: string, newPassword: string): Promise<{ username: string }> => {
    const { data } = await api.post<ApiResponse<{ username: string }>>(`/admin/students/${id}/password`, { newPassword });
    return data.data;
  },
};
