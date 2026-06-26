export type GoalType = 'economizar' | 'reduzir' | 'quitar_divida';

export type GoalStatus = 'ativa' | 'concluida' | 'cancelada';

export interface Goal {
  id: string;
  userId: string;
  type: GoalType;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  status: GoalStatus;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalProgress {
  goalId: string;
  percentage: number;
  daysRemaining: number;
  amountNeeded: number;
  onTrack: boolean;
  estimatedCompletion: Date;
}

export const GOAL_TYPES = {
  economizar: {
    label: 'Economizar Dinheiro',
    icon: '💰',
    description: 'Juntar dinheiro para um objetivo',
    color: '#10b981',
  },
  reduzir: {
    label: 'Reduzir Gastos',
    icon: '📉',
    description: 'Diminuir gastos mensais',
    color: '#3b82f6',
  },
  quitar_divida: {
    label: 'Quitar Dívida',
    icon: '💳',
    description: 'Pagar dívidas acumuladas',
    color: '#ef4444',
  },
};