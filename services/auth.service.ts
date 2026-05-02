import api from '@/lib/axios';
import { AuthResponse, LoginPayload } from '@/types/auth.types';

export const loginService = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
};

export const getProfileService = async () => {
  const { data } = await api.get('/auth/profile');
  return data;
};
