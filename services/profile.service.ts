import api from '@/lib/axios';
import { ApiResponse, StudentProfile, TeacherProfile, ChangePasswordPayload, UpdateStudentPayload, UpdateTeacherPayload } from '@/types';
import type { StaffProfile, UpdateStaffProfilePayload } from '@/types/staff-profile.types';

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

export const getStaffProfile = async (): Promise<StaffProfile> => {
  const { data } = await api.get<ApiResponse<StaffProfile>>('/profile/staff');
  return data.data;
};

export const updateStaffProfile = async (payload: UpdateStaffProfilePayload): Promise<StaffProfile> => {
  const { data } = await api.patch<ApiResponse<StaffProfile>>('/profile/staff', payload);
  return data.data;
};
