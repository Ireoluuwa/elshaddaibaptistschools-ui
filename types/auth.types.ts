export interface User {
  username: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginPayload {
  username: string;
  password?: string;
}
