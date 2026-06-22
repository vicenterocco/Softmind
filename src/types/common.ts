// Vraj

export type Theme = 'light' | 'dark';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  description: string;
  city: string;
  contact: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
    website?: string;
  };
  rating?: number;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}