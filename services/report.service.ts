import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import { DashboardInitData, ReportPayload, WeeklyReport, StudentHistoryData, StudentDashboardData, StudentReportDetail } from '@/types/report';

export const initTeacherDashboardService = async (): Promise<DashboardInitData> => {
  const { data } = await api.get<ApiResponse<DashboardInitData>>('/reports/dashboard-init');
  return data.data;
};

export const submitReportService = async (payload: ReportPayload): Promise<WeeklyReport> => {
  const { data } = await api.post<ApiResponse<WeeklyReport>>('/reports', payload);
  return data.data;
};

export const getStudentHistoryService = async (studentId: string, termId: string): Promise<StudentHistoryData> => {
  const { data } = await api.get<ApiResponse<StudentHistoryData>>(`/reports/student-history`, {
    params: { studentId, termId }
  });
  return data.data;
};

export const getStudentDashboardService = async (termId?: string): Promise<StudentDashboardData> => {
  const { data } = await api.get<ApiResponse<StudentDashboardData>>('/reports/student-dashboard', {
    params: { termId }
  });
  return data.data;
};

export const getReportDetailService = async (reportId: string): Promise<StudentReportDetail> => {
  const { data } = await api.get<ApiResponse<StudentReportDetail>>(`/reports/${reportId}`);
  return data.data;
};

