export type SpendingCategory = 
  | 'alimentacao'
  | 'transporte'
  | 'saude'
  | 'lazer'
  | 'eletronicos'
  | 'roupas'
  | 'casa'
  | 'educacao'
  | 'beleza'
  | 'outros';

export type EmotionType =
  | 'feliz'
  | 'triste'
  | 'ansioso'
  | 'estressado'
  | 'entediado'
  | 'impulsivo'
  | 'neutro';

export type NecessityType = 'necessidade' | 'desejo';

export interface Spending {
  id: string;
  userId: string;
  amount: number;
  category: SpendingCategory;
  description: string;
  date: Date;
  necessity: NecessityType;
  emotion: EmotionType;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpendingStats {
  totalSpent: number;
  totalNecessary: number;
  totalWaste: number;
  averageByDay: number;
  byCategory: Record<SpendingCategory, number>;
  byEmotion: Record<EmotionType, number>;
  byNecessity: Record<NecessityType, number>;
}

export interface WaitlistItem {
  id: string;
  userId: string;
  productName: string;
  estimatedPrice: number;
  reason: string;
  createdAt: Date;
  daysWaiting: number;
  purchased: boolean;
}

export const SPENDING_CATEGORIES = {
  alimentacao: { label: 'Alimentação', icon: '🍔', color: '#f97316' },
  transporte: { label: 'Transporte', icon: '🚗', color: '#3b82f6' },
  saude: { label: 'Saúde', icon: '💊', color: '#ec4899' },
  lazer: { label: 'Lazer', icon: '🎮', color: '#8b5cf6' },
  eletronicos: { label: 'Eletrônicos', icon: '📱', color: '#06b6d4' },
  roupas: { label: 'Roupas', icon: '👕', color: '#f43f5e' },
  casa: { label: 'Casa', icon: '🏠', color: '#10b981' },
  educacao: { label: 'Educação', icon: '📚', color: '#f59e0b' },
  beleza: { label: 'Beleza', icon: '💄', color: '#d946ef' },
  outros: { label: 'Outros', icon: '📦', color: '#6b7280' },
};

export const EMOTION_TYPES = {
  feliz: { label: 'Feliz', emoji: '😊', color: '#fbbf24' },
  triste: { label: 'Triste', emoji: '😢', color: '#60a5fa' },
  ansioso: { label: 'Ansioso', emoji: '😰', color: '#f87171' },
  estressado: { label: 'Estressado', emoji: '😤', color: '#ef4444' },
  entediado: { label: 'Entediado', emoji: '😑', color: '#9ca3af' },
  impulsivo: { label: 'Impulsivo', emoji: '🤪', color: '#ec4899' },
  neutro: { label: 'Neutro', emoji: '😐', color: '#6b7280' },
};