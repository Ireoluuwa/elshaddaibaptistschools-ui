import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type { CreatedStudent, EnrollStudentPayload } from '@/types/enrollment.types';

export const enrollmentService = {
  enrollOne: async (payload: EnrollStudentPayload): Promise<CreatedStudent> => {
    const { data } = await api.post<ApiResponse<CreatedStudent>>('/student/manual', payload);
    return data.data;
  },

  enrollFromCsv: async (file: File): Promise<{ enrolled: number; students: CreatedStudent[] }> => {
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post<ApiResponse<{ enrolled: number; students: CreatedStudent[] }>>(
      '/student/batch',
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return data.data;
  },
};
