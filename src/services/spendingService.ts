import { apiService } from './api';
import type { Spending, SpendingStats, WaitlistItem } from '../types/spending';

class SpendingService {
  // Gastos
  async getSpending(userId: string, filters?: {
    startDate?: Date;
    endDate?: Date;
    category?: string;
  }): Promise<Spending[]> {
    const response = await apiService.get<Spending[]>(
      `/spending?userId=${userId}&${new URLSearchParams(filters as any).toString()}`
    );

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao buscar gastos');
  }

  async getSpendingById(id: string): Promise<Spending> {
    const response = await apiService.get<Spending>(`/spending/${id}`);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao buscar gasto');
  }

  async createSpending(data: Omit<Spending, 'id' | 'createdAt' | 'updatedAt'>): Promise<Spending> {
    const response = await apiService.post<Spending>('/spending', data);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao criar gasto');
  }

  async updateSpending(id: string, data: Partial<Spending>): Promise<Spending> {
    const response = await apiService.put<Spending>(`/spending/${id}`, data);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao atualizar gasto');
  }

  async deleteSpending(id: string): Promise<void> {
    const response = await apiService.delete<void>(`/spending/${id}`);

    if (!response.success) {
      throw new Error(response.error || 'Erro ao deletar gasto');
    }
  }

  // Estatísticas
  async getStats(userId: string, period: 'semana' | 'mes' | 'ano' = 'mes'): Promise<SpendingStats> {
    const response = await apiService.get<SpendingStats>(
      `/spending/stats/${userId}?period=${period}`
    );

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao buscar estatísticas');
  }

  // Lista de espera
  async getWaitlist(userId: string): Promise<WaitlistItem[]> {
    const response = await apiService.get<WaitlistItem[]>(`/waitlist/${userId}`);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao buscar lista de espera');
  }

  async addToWaitlist(data: Omit<WaitlistItem, 'id' | 'createdAt' | 'daysWaiting'>): Promise<WaitlistItem> {
    const response = await apiService.post<WaitlistItem>('/waitlist', data);

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao adicionar à lista de espera');
  }

  async removeFromWaitlist(id: string): Promise<void> {
    const response = await apiService.delete<void>(`/waitlist/${id}`);

    if (!response.success) {
      throw new Error(response.error || 'Erro ao remover da lista de espera');
    }
  }

  async markAsPurchased(id: string): Promise<WaitlistItem> {
    const response = await apiService.put<WaitlistItem>(`/waitlist/${id}`, { purchased: true });

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erro ao atualizar item');
  }
}

export const spendingService = new SpendingService();