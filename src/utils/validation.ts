// Vraj

import { z } from 'zod';

// Schemas de validação
export const signupSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z
    .string()
    .email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar os termos e condições',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória'),
  rememberMe: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z
    .string()
    .email('Email inválido'),
  subject: z
    .string()
    .min(5, 'Assunto deve ter no mínimo 5 caracteres')
    .max(100, 'Assunto deve ter no máximo 100 caracteres'),
  message: z
    .string()
    .min(20, 'Mensagem deve ter no mínimo 20 caracteres')
    .max(2000, 'Mensagem deve ter no máximo 2000 caracteres'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  consent: z.boolean().refine(val => val === true, {
    message: 'Você deve consentir para receber emails',
  }),
});

// Type inference from schemas
export type SignupFormType = z.infer<typeof signupSchema>;
export type LoginFormType = z.infer<typeof loginSchema>;
export type ContactFormType = z.infer<typeof contactSchema>;
export type NewsletterFormType = z.infer<typeof newsletterSchema>;

// Funções auxiliares de validação
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Pelo menos uma letra maiúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Pelo menos uma letra minúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Pelo menos um número');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10,14}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 2000);
};