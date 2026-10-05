import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type { ClassProgress, ClassResultRow } from '@/types/admin-results.types';

export const adminResultsService = {
  overview: async (termId: string): Promise<ClassProgress[]> => {
    const { data } = await api.get<ApiResponse<ClassProgress[]>>('/admin/results/overview', { params: { termId } });
    return data.data;
  },

  classResults: async (termId: string, classId: string): Promise<ClassResultRow[]> => {
    const { data } = await api.get<ApiResponse<ClassResultRow[]>>('/admin/results', { params: { termId, classId } });
    return data.data;
  },

  setVpRemark: async (resultId: string, vpRemark: string | null): Promise<{ id: string; vpRemark: string | null }> => {
    const { data } = await api.patch<ApiResponse<{ id: string; vpRemark: string | null }>>(
      `/admin/results/${resultId}/vp-remark`,
      { vpRemark },
    );
    return data.data;
  },
};
