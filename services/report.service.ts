import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import { DashboardInitData, ReportPayload, WeeklyReport } from '@/types/report';

export const initTeacherDashboardService = async (): Promise<DashboardInitData> => {
  const { data } = await api.get<ApiResponse<DashboardInitData>>('/reports/dashboard-init');
  return data.data;
};

export const submitReportService = async (payload: ReportPayload): Promise<WeeklyReport> => {
  const { data } = await api.post<ApiResponse<WeeklyReport>>('/reports', payload);
  return data.data;
};

export const getStudentHistoryService = async (studentId: string, termId: string): Promise<WeeklyReport[]> => {
  const { data } = await api.get<ApiResponse<WeeklyReport[]>>(`/reports/student-history`, {
    params: { studentId, termId }
  });
  return data.data;
};
