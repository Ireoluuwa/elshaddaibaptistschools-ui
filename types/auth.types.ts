export interface User {
  id: string;
  email: string;
  role: string;
  // Add other fields based on your backend
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password?: string;
}
