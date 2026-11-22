import { httpClient } from '../api/httpClient';
import type { AuthUser } from '../types/authUser';
import type { LoginResponse } from '../types/loginResponse';

export interface LoginCredentials {
  username: string;
  password: string;
}

export const authRepository = {
  async login(username: string, password: string, signal?: AbortSignal): Promise<LoginResponse> {
    return httpClient<LoginResponse>('/auth/login', {
      signal,
      method: 'POST',
      body: JSON.stringify({
    
      username: username,
      password: password,
    }),
    });
  },

  async getCurrentUser(accessToken: string, signal?: AbortSignal): Promise<AuthUser> {
    return httpClient<AuthUser>('/auth/me', {
      signal,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};