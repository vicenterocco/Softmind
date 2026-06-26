import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/shared/Toast';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { DashboardCard, ProgressCard } from '../../components/dashboard/DashboardCard';
import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/Button';
import { ExpenseForm } from '../../components/dashboard/ExpenseForm';
import { spendingService } from '../../services/spendingService';
import type { DashboardData, PeriodStats } from '../../types/dashboard';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showError } = useToast();

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    monthlySpent: 0,
    monthlyBudget: 2000,
    totalSaved: 0,
    goalsCompleted: 0,
    impulsesPrevented: 0,
    currentStreak: 0,
  });

  const [stats, setStats] = useState<PeriodStats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [isAuthenticated, user?.id]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Simular dados do backend
      // Em produção, isso viria do serviço
      const mockData: DashboardData = {
        monthlySpent: 1240.50,
        monthlyBudget: 2000,
        totalSaved: 3500,
        goalsCompleted: 5,
        impulsesPrevented: 12,
        currentStreak: 8,
      };

      const mockStats: PeriodStats = {
        period: 'mes',
        totalSpent: 1240.50,
        averageDaily: 41.35,
        highestDay: {
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          amount: 250,
        },
        lowestDay: {
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          amount: 15,
        },
      };

      setDashboardData(mockData);
      setStats(mockStats);
    } catch (error) {
      showError('Erro ao carregar dashboard');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExpense = async (data: any) => {
    try {
      await spendingService.createSpending({
        userId: user?.id || '',
        amount: data.amount,
        category: data.category,
        description: data.description,
        date: new Date(data.date),
        necessity: data.necessity,
        emotion: data.emotion,
      });

      // Recarregar dashboard
      await loadDashboardData();
    } catch (error) {
      throw error;
    }
  };

  const remainingBudget = dashboardData.monthlyBudget - dashboardData.monthlySpent;
  const budgetPercentage = (dashboardData.monthlySpent / dashboardData.monthlyBudget) * 100;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">Carregando dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Cards Principais */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <DashboardCard
          title="Gasto do Mês"
          value={`R$ ${dashboardData.monthlySpent.toFixed(2)}`}
          icon="💸"
          trend={{ value: 5, direction: 'down' }}
          color="pink"
        />
        <DashboardCard
          title="Orçamento Restante"
          value={`R$ ${remainingBudget.toFixed(2)}`}
          icon="💰"
          trend={{ value: 12, direction: 'up' }}
          color="green"
        />
        <DashboardCard
          title="Total Economizado"
          value={`R$ ${dashboardData.totalSaved.toFixed(2)}`}
          icon="🏦"
          color="indigo"
        />
        <DashboardCard
          title="Compras Evitadas"
          value={dashboardData.impulsesPrevented}
          icon="🛑"
          color="amber"
        />
      </motion.div>

      {/* Progresso Orçamentário */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProgressCard
          title="Progresso do Orçamento"
          current={dashboardData.monthlySpent}
          target={dashboardData.monthlyBudget}
          unit="R$"
          color={budgetPercentage > 80 ? '#ef4444' : budgetPercentage > 60 ? '#f59e0b' : '#10b981'}
        />
        <ProgressCard
          title="Sequência de Dias sem Impulsos"
          current={dashboardData.currentStreak}
          target={30}
          unit="dias"
          color="#6366f1"
        />
      </div>

      {/* Estatísticas e Ações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumo Mensal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Resumo do Mês
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Média Diária:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                R$ {stats?.averageDaily.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Maior Gasto:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                R$ {stats?.highestDay.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Menor Gasto:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                R$ {stats?.lowestDay.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Metas Concluídas:</span>
              <span className="font-bold text-green-600">{dashboardData.goalsCompleted}</span>
            </div>
          </div>
        </motion.div>

        {/* Ações Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⚡ Ações Rápidas
          </h3>
          <div className="space-y-2">
            <Button
              fullWidth
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              + Adicionar Despesa
            </Button>
            <Button
              fullWidth
              size="sm"
              variant="outline"
              onClick={() => navigate('/dashboard/gastos')}
            >
              Ver Detalhes
            </Button>
            <Button
              fullWidth
              size="sm"
              variant="outline"
              onClick={() => navigate('/dashboard/metas')}
            >
              Gerenciar Metas
            </Button>
            <Button
              fullWidth
              size="sm"
              variant="outline"
              onClick={() => navigate('/dashboard/analise')}
            >
              Ver Análise
            </Button>
          </div>
        </motion.div>

        {/* Dicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900/30 dark:to-pink-900/30 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            💡 Dica do Dia
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Você está gastando menos esse mês! Mantenha o foco e use a economia para alcançar seus
            objetivos. 🎯
          </p>
        </motion.div>
      </div>

      {/* Modal - Adicionar Despesa */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Nova Despesa"
        size="md"
      >
        <ExpenseForm onSubmit={handleAddExpense} />
      </Modal>
    </DashboardLayout>
  );
}