import api from '@/lib/axios';
import { AuthResponse, LoginPayload } from '@/types/auth.types';
import { ApiResponse } from '@/types';

export const loginService = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', payload);
  return data.data;
};

export const getProfileService = async () => {
  const { data } = await api.get<ApiResponse<any>>('/auth/profile');
  return data.data;
};
