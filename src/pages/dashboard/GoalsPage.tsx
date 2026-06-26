import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/shared/Toast';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ProgressCard } from '../../components/dashboard/DashboardCard';
import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/Button';
import { GoalForm } from '../../components/dashboard/GoalsForm';
import { goalsService } from '../../services/goalsService';
import { GOAL_TYPES } from '../../types/goals';
import type { Goal } from '../../types/goals';

export function GoalsPage() {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, [user?.id]);

  const loadGoals = async () => {
    try {
      setIsLoading(true);
      // Mock data
      const mockGoals: Goal[] = [
        {
          id: '1',
          userId: user?.id || '',
          type: 'economizar',
          title: 'Férias em Dezembro',
          description: 'Viajar para o exterior',
          targetAmount: 3000,
          currentAmount: 1500,
          deadline: new Date('2024-12-31'),
          status: 'ativa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          userId: user?.id || '',
          type: 'reduzir',
          title: 'Reduzir gastos mensais',
          description: 'De R$ 2000 para R$ 1500',
          targetAmount: 1500,
          currentAmount: 1800,
          deadline: new Date('2025-03-31'),
          status: 'ativa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      setGoals(mockGoals);
    } catch (error) {
      showError('Erro ao carregar metas');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGoal = async (data: any) => {
    try {
      await goalsService.createGoal({
        userId: user?.id || '',
        type: data.type,
        title: data.title,
        description: data.description,
        targetAmount: data.targetAmount,
        currentAmount: 0,
        deadline: new Date(data.deadline),
        status: 'ativa',
        category: data.category,
      });

      showSuccess('Meta criada com sucesso!');
      setIsModalOpen(false);
      await loadGoals();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao criar meta');
    }
  };

  const handleDeleteGoal = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar esta meta?')) return;

    try {
      await goalsService.deleteGoal(id);
      showSuccess('Meta deletada com sucesso!');
      await loadGoals();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao deletar meta');
    }
  };

  const activeGoals = goals.filter((goal) => goal.status === 'ativa');
  const completedGoals = goals.filter((goal) => goal.status === 'concluida');

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">Carregando metas...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Metas Financeiras</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {activeGoals.length} ativa{activeGoals.length !== 1 ? 's' : ''} • {completedGoals.length}{' '}
              concluída{completedGoals.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            + Nova Meta
          </Button>
        </div>

        {/* Metas Ativas */}
        {activeGoals.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">🎯 Metas Ativas</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4"
            >
              {activeGoals.map((goal) => {
                const goalType = GOAL_TYPES[goal.type];
                const daysRemaining = Math.ceil(
                  (goal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <motion.div
                    key={goal.id}
                    whileHover={{ y: -2 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{goalType.icon}</span>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {goal.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {goal.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        🗑️
                      </button>
                    </div>

                    <ProgressCard
                      title="Progresso"
                      current={goal.currentAmount}
                      target={goal.targetAmount}
                      unit="R$"
                      color={goalType.color}
                    />

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        📅 {daysRemaining} dias restantes
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}% completo
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* Metas Concluídas */}
        {completedGoals.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">✅ Metas Concluídas</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4"
            >
              {completedGoals.map((goal) => {
                const goalType = GOAL_TYPES[goal.type];

                return (
                  <motion.div
                    key={goal.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-2 border-green-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goalType.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {goal.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            R$ {goal.targetAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <span className="text-3xl">🎉</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}

        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Você ainda não tem metas. Crie uma agora!
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              + Criar Primeira Meta
            </Button>
          </motion.div>
        )}
      </div>

      {/* Modal - Criar Meta */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Criar Nova Meta"
        size="md"
      >
        <GoalForm onSubmit={handleAddGoal} />
      </Modal>
    </DashboardLayout>
  );
}