import api from '@/lib/axios';
import { ApiResponse } from '@/types';

export interface MappedSubject {
  id: string;
  name: string;
}

export const getMappedSubjectsService = async (
  classId: string,
  departmentId?: string | null
): Promise<MappedSubject[]> => {
  const params: Record<string, string> = { classId };
  if (departmentId) params.departmentId = departmentId;

  const { data } = await api.get<ApiResponse<MappedSubject[]>>(
    '/academics/subjects/mapped',
    { params }
  );
  return data.data;
};
