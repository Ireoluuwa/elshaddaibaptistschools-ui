import api from '@/lib/axios';
import { ApiResponse, StudentProfile, TeacherProfile, ChangePasswordPayload, UpdateStudentPayload, UpdateTeacherPayload } from '@/types';

export const getStudentProfile = async (): Promise<StudentProfile> => {
  const { data } = await api.get<ApiResponse<StudentProfile>>('/profile/student');
  return data.data;
};

export const updateStudentProfile = async (payload: UpdateStudentPayload): Promise<StudentProfile> => {
  const { data } = await api.patch<ApiResponse<StudentProfile>>('/profile/student', payload);
  return data.data;
};

export const getTeacherProfile = async (): Promise<TeacherProfile> => {
  const { data } = await api.get<ApiResponse<TeacherProfile>>('/profile/teacher');
  return data.data;
};

export const updateTeacherProfile = async (payload: UpdateTeacherPayload): Promise<TeacherProfile> => {
  const { data } = await api.patch<ApiResponse<TeacherProfile>>('/profile/teacher', payload);
  return data.data;
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<{ message: string }> => {
  const { data } = await api.post<ApiResponse<{ message: string }>>('/profile/change-password', payload);
  return data.data;
};
