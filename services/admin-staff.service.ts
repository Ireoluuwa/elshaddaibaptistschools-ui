import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type { BursarAccount, CreateStaffPayload, TeacherAccount } from '@/types/admin-staff.types';

type Username = { username: string };

// Teachers and bursars share the same account actions under their own path.
const accountActions = <T>(base: string) => ({
  setPassword: async (id: string, newPassword: string): Promise<Username> => {
    const { data } = await api.post<ApiResponse<Username>>(`${base}/${id}/password`, { newPassword });
    return data.data;
  },
  remove: async (id: string): Promise<T> => {
    const { data } = await api.post<ApiResponse<T>>(`${base}/${id}/remove`);
    return data.data;
  },
  restore: async (id: string): Promise<T> => {
    const { data } = await api.post<ApiResponse<T>>(`${base}/${id}/restore`);
    return data.data;
  },
  deletePermanently: async (id: string): Promise<void> => {
    await api.delete(`${base}/${id}`);
  },
});

export const adminTeachersService = {
  getAll: async (): Promise<TeacherAccount[]> => {
    const { data } = await api.get<ApiResponse<TeacherAccount[]>>('/admin/teachers');
    return data.data;
  },
  create: async (payload: CreateStaffPayload): Promise<{ teacher: TeacherAccount; password: string }> => {
    const { data } = await api.post<ApiResponse<{ teacher: TeacherAccount; password: string }>>('/admin/teachers', payload);
    return data.data;
  },
  assignClass: async (id: string, classId: string | null): Promise<TeacherAccount> => {
    const { data } = await api.patch<ApiResponse<TeacherAccount>>(`/admin/teachers/${id}/class`, { classId });
    return data.data;
  },
  ...accountActions<TeacherAccount>('/admin/teachers'),
};

export const adminBursarsService = {
  getAll: async (): Promise<BursarAccount[]> => {
    const { data } = await api.get<ApiResponse<BursarAccount[]>>('/admin/bursars');
    return data.data;
  },
  invite: async (payload: CreateStaffPayload): Promise<{ bursar: BursarAccount; password: string }> => {
    const { data } = await api.post<ApiResponse<{ bursar: BursarAccount; password: string }>>('/admin/bursars', payload);
    return data.data;
  },
  ...accountActions<BursarAccount>('/admin/bursars'),
};
