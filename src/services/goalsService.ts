import { apiService } from './api';
import type { Goal, GoalProgress } from '../types/goals';

class GoalsService {
  async getGoals(userId: string, status?: string): Promise<Goal[]> {
    const response = await apiService.get<Goal[]>(
      `/goals/${userId}${status ? `?status=${status}` : ''}`
    );

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao buscar metas');
  }

  async getGoalById(id: string): Promise<Goal> {
    const response = await apiService.get<Goal>(`/goals/${id}`);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao buscar meta');
  }

  async createGoal(data: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> {
    const response = await apiService.post<Goal>('/goals', data);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao criar meta');
  }

  async updateGoal(id: string, data: Partial<Goal>): Promise<Goal> {
    const response = await apiService.put<Goal>(`/goals/${id}`, data);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao atualizar meta');
  }

  async deleteGoal(id: string): Promise<void> {
    const response = await apiService.delete<void>(`/goals/${id}`);

    if (!response.success) {
      throw new Error(response.error || 'Erro ao deletar meta');
    }
  }

  async getGoalProgress(goalId: string): Promise<GoalProgress> {
    const response = await apiService.get<GoalProgress>(`/goals/${goalId}/progress`);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao buscar progresso');
  }

  async addToGoal(goalId: string, amount: number): Promise<Goal> {
    const response = await apiService.post<Goal>(`/goals/${goalId}/add`, { amount });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao adicionar à meta');
  }

  async completeGoal(id: string): Promise<Goal> {
    const response = await apiService.put<Goal>(`/goals/${id}`, { status: 'concluida' });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao completar meta');
  }
}

export const goalsService = new GoalsService();