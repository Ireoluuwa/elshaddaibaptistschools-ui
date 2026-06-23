import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import {
  BulkUpsertResultPayload,
  MyResultData,
  ResultsDashboardInitData,
  StudentResultData,
  SubjectOption,
  TerminalResult,
  UpsertResultPayload,
} from '@/types/result';

export const initResultsDashboardService = async (): Promise<ResultsDashboardInitData> => {
  const { data } = await api.get<ApiResponse<ResultsDashboardInitData>>('/results/init');
  return data.data;
};

export const upsertResultService = async (payload: UpsertResultPayload): Promise<TerminalResult> => {
  const { data } = await api.post<ApiResponse<TerminalResult>>('/results', payload);
  return data.data;
};

export const bulkUpsertResultsService = async (payload: BulkUpsertResultPayload): Promise<{ saved: number }> => {
  const { data } = await api.post<ApiResponse<{ saved: number }>>('/results/bulk', payload);
  return data.data;
};

export const getStudentResultService = async (studentId: string, termId: string): Promise<StudentResultData> => {
  const { data } = await api.get<ApiResponse<StudentResultData>>('/results/student', {
    params: { studentId, termId },
  });
  return data.data;
};

export const getMyResultService = async (termId?: string): Promise<MyResultData> => {
  const { data } = await api.get<ApiResponse<MyResultData>>('/results/my-result', {
    params: { termId },
  });
  return data.data;
};

export const getResultSubjectsService = async (studentId: string): Promise<SubjectOption[]> => {
  const { data } = await api.get<ApiResponse<SubjectOption[]>>('/results/subjects', {
    params: { studentId },
  });
  return data.data;
};
