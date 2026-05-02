import api from '@/lib/axios';
import { ApiResponse, StudentProfile, ChangePasswordPayload, UpdateStudentPayload } from '@/types';

export const getStudentProfile = async (): Promise<StudentProfile> => {
  const { data } = await api.get<ApiResponse<StudentProfile>>('/profile/student');
  return data.data;
};

export const updateStudentProfile = async (payload: UpdateStudentPayload): Promise<StudentProfile> => {
  const { data } = await api.patch<ApiResponse<StudentProfile>>('/profile/student', payload);
  return data.data;
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<{ message: string }> => {
  const { data } = await api.post<ApiResponse<{ message: string }>>('/profile/change-password', payload);
  return data.data;
};
