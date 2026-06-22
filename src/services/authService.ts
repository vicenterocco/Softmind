// Vraj

import { apiService } from './api';
import type { SignupFormType, LoginFormType } from '../utils/validation';
import type { AuthResponse, User } from '../types/auth';
import { AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY, USER_STORAGE_KEY } from '../utils/constants';

class AuthService {
  async signup(data: SignupFormType): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response.success && response.data) {
      this.setSession(response.data);
      return response.data;
    }

    throw new Error(response.error || 'Erro ao cadastrar');
  }

  async login(data: LoginFormType): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', {
      email: data.email,
      password: data.password,
    });

    if (response.success && response.data) {
      this.setSession(response.data);
      return response.data;
    }

    throw new Error(response.error || 'Erro ao fazer login');
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      this.clearSession();
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    const response = await apiService.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });

    if (response.success && response.data) {
      this.setSession(response.data);
      return response.data.token;
    }

    throw new Error(response.error || 'Erro ao renovar token');
  }

  async resetPasswordRequest(email: string): Promise<void> {
    const response = await apiService.post('/auth/reset-password-request', {
      email,
    });

    if (!response.success) {
      throw new Error(response.error || 'Erro ao solicitar reset de senha');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await apiService.post('/auth/reset-password', {
      token,
      newPassword,
    });

    if (!response.success) {
      throw new Error(response.error || 'Erro ao resetar senha');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await apiService.post('/auth/verify-email', {
      token,
    });

    if (!response.success) {
      throw new Error(response.error || 'Erro ao verificar email');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiService.get<User>('/auth/me');
      if (response.success && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  setSession(data: AuthResponse): void {
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    if (data.refreshToken) {
      localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, data.refreshToken);
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
  }

  clearSession(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
  }

  getStoredUser(): User | null {
    try {
      const user = localStorage.getItem(USER_STORAGE_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();