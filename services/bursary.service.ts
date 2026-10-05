import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type {
  BillsResponse,
  BursaryOverview,
  BursaryTerm,
  FeesResponse,
  SaveBillPayload,
} from '@/types/bursary.types';

// termId is optional on reads; the server uses the active term.
export const bursaryService = {
  terms: async (): Promise<BursaryTerm[]> => {
    const { data } = await api.get<ApiResponse<BursaryTerm[]>>('/bursary/terms');
    return data.data;
  },

  overview: async (termId?: string): Promise<BursaryOverview> => {
    const { data } = await api.get<ApiResponse<BursaryOverview>>('/bursary/overview', { params: { termId } });
    return data.data;
  },

  bills: async (termId?: string): Promise<BillsResponse> => {
    const { data } = await api.get<ApiResponse<BillsResponse>>('/bursary/bills', { params: { termId } });
    return data.data;
  },

  saveBill: async (termId: string, classId: string, payload: SaveBillPayload): Promise<BillsResponse> => {
    const { data } = await api.put<ApiResponse<BillsResponse>>(`/bursary/bills/${classId}`, payload, {
      params: { termId },
    });
    return data.data;
  },

  fees: async (classId: string, termId?: string): Promise<FeesResponse> => {
    const { data } = await api.get<ApiResponse<FeesResponse>>('/bursary/fees', { params: { classId, termId } });
    return data.data;
  },

  saveFees: async (termId: string, fees: { studentId: string; outstanding: number }[]): Promise<void> => {
    await api.put('/bursary/fees', { fees }, { params: { termId } });
  },
};
