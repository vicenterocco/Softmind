// Vraj

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChecklistItem {
  id: string;
  question: string;
  category: 'emotional' | 'behavioral' | 'financial';
  checked: boolean;
  severity?: 'low' | 'medium' | 'high';
}

export interface ChecklistResult {
  totalItems: number;
  checkedItems: number;
  percentage: number;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  categories: {
    emotional: number;
    behavioral: number;
    financial: number;
  };
}

export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormError[];
  isSubmitting: boolean;
  isDirty: boolean;
}

export interface NewsletterSubscription {
  email: string;
  consent: boolean;
}