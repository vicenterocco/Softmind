// auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// user.ts
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

// forms.ts
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChecklistItem {
  id: string;
  question: string;
  checked: boolean;
}

// common.ts
export type Theme = 'light' | 'dark';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}