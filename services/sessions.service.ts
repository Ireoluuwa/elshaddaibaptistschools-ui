import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type {
  CreateSessionPayload,
  CreateTermPayload,
  Session,
  Term,
  UpdateReportDetailsPayload,
} from '@/types/session.types';

export const sessionsService = {
  getAll: async (): Promise<Session[]> => {
    const { data } = await api.get<ApiResponse<Session[]>>('/academics/sessions');
    return data.data;
  },

  create: async (payload: CreateSessionPayload): Promise<Session> => {
    const { data } = await api.post<ApiResponse<Session>>('/academics/sessions', payload);
    return data.data;
  },

  addTerm: async (sessionId: string, payload: CreateTermPayload): Promise<Session> => {
    const { data } = await api.post<ApiResponse<Session>>(`/academics/sessions/${sessionId}/terms`, payload);
    return data.data;
  },

  activateTerm: async (termId: string): Promise<Term> => {
    const { data } = await api.post<ApiResponse<Term>>(`/academics/terms/${termId}/activate`);
    return data.data;
  },

  closeTerm: async (termId: string): Promise<Term> => {
    const { data } = await api.post<ApiResponse<Term>>(`/academics/terms/${termId}/close`);
    return data.data;
  },

  updateReportDetails: async (termId: string, payload: UpdateReportDetailsPayload): Promise<Term> => {
    const { data } = await api.patch<ApiResponse<Term>>(`/academics/terms/${termId}/report-details`, payload);
    return data.data;
  },
};
