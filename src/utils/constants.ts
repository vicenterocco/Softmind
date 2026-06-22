// Vraj

// API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 30000; // 30 segundos

// Rotas
export const ROUTES = {
  HOME: '/',
  ABOUT: '/sobre-oniomania',
  CHECKLIST: '/checklist',
  HOW_IT_WORKS: '/como-funciona',
  BENEFITS: '/beneficios',
  PROFESSIONALS: '/profissionais',
  FAQ: '/faq',
  CONTACT: '/contato',
  SIGNUP: '/cadastro',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/perfil',
  SETTINGS: '/configuracoes',
  NOT_FOUND: '/404',
};

// Autenticação
export const AUTH_TOKEN_KEY = 'softmind_token';
export const AUTH_REFRESH_TOKEN_KEY = 'softmind_refresh_token';
export const USER_STORAGE_KEY = 'softmind_user';
export const TOKEN_EXPIRY_KEY = 'softmind_token_expiry';

// Temas
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const DEFAULT_THEME = 'light';

// Cores
export const COLORS = {
  PRIMARY: '#6366f1',
  SECONDARY: '#ec4899',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  NEUTRAL: '#6b7280',
  WHITE: '#ffffff',
  BLACK: '#000000',
} as const;

// Breakpoints Tailwind
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Durações de animação
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Toast defaults
export const TOAST_DEFAULTS = {
  DURATION: 3000,
  POSITION: 'bottom-right' as const,
} as const;

// Validação
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 254;
export const MESSAGE_MAX_LENGTH = 2000;

// Locale
export const DEFAULT_LOCALE = 'pt-BR';
export const SUPPORTED_LOCALES = ['pt-BR', 'en-US'] as const;

// Storage
export const STORAGE_KEYS = {
  THEME: 'softmind_theme',
  LANGUAGE: 'softmind_language',
  USER_PREFERENCES: 'softmind_preferences',
  DRAFT_FORMS: 'softmind_draft_forms',
} as const;

// Feature flags
export const FEATURES = {
  PROFESSIONAL_DIRECTORY: true,
  ANTI_IMPULSE_SYSTEM: true,
  FINANCIAL_GOALS: true,
  MOOD_TRACKING: true,
} as const;

// Links externos
export const EXTERNAL_LINKS = {
  TWITTER: 'https://twitter.com/softmind',
  INSTAGRAM: 'https://instagram.com/softmind',
  LINKEDIN: 'https://linkedin.com/company/softmind',
  GITHUB: 'https://github.com/vrajlok',
  SUPPORT_EMAIL: 'suporte@softmind.com',
  CONTACT_EMAIL: 'contato@softmind.com',
} as const;

// Paginação
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;