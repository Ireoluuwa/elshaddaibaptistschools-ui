import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type { ClassPromotion, PromotionDecision, PromotionSummary } from '@/types/promotions.types';

export const promotionsService = {
  summary: async (): Promise<PromotionSummary> => {
    const { data } = await api.get<ApiResponse<PromotionSummary>>('/admin/promotions');
    return data.data;
  },

  forClass: async (classId: string): Promise<ClassPromotion> => {
    const { data } = await api.get<ApiResponse<ClassPromotion>>(`/admin/promotions/${classId}`);
    return data.data;
  },

  save: async (classId: string, decisions: PromotionDecision[]): Promise<ClassPromotion> => {
    const { data } = await api.put<ApiResponse<ClassPromotion>>(`/admin/promotions/${classId}`, { decisions });
    return data.data;
  },

  undo: async (classId: string): Promise<ClassPromotion> => {
    const { data } = await api.delete<ApiResponse<ClassPromotion>>(`/admin/promotions/${classId}`);
    return data.data;
  },
};
