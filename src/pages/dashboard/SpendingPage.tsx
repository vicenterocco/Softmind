import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/shared/Toast';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/Button';
import { Input } from '../../components/shared/Input';
import { ExpenseForm } from '../../components/dashboard/ExpenseForm';
import { spendingService } from '../../services/spendingService';
import { SPENDING_CATEGORIES, EMOTION_TYPES } from '../../types/spending';
import type { Spending } from '../../types/spending';

export function SpendingPage() {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [filteredSpendings, setFilteredSpendings] = useState<Spending[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSpendings();
  }, [user?.id]);

  useEffect(() => {
    filterSpendings();
  }, [spendings, searchTerm, selectedCategory]);

  const loadSpendings = async () => {
    try {
      setIsLoading(true);
      // Em produção: const data = await spendingService.getSpending(user?.id || '');
      // Por enquanto, mock data
      const mockSpendings: Spending[] = [
        {
          id: '1',
          userId: user?.id || '',
          amount: 150.00,
          category: 'alimentacao',
          description: 'Compra no mercado',
          date: new Date(),
          necessity: 'necessidade',
          emotion: 'neutro',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          userId: user?.id || '',
          amount: 200.00,
          category: 'eletronicos',
          description: 'Fone de ouvido',
          date: new Date(Date.now() - 86400000),
          necessity: 'desejo',
          emotion: 'feliz',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      setSpendings(mockSpendings);
    } catch (error) {
      showError('Erro ao carregar gastos');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterSpendings = () => {
    let filtered = spendings;

    if (searchTerm) {
      filtered = filtered.filter((spending) =>
        spending.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((spending) => spending.category === selectedCategory);
    }

    setFilteredSpendings(filtered);
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

      showSuccess('Despesa adicionada com sucesso!');
      setIsModalOpen(false);
      await loadSpendings();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao adicionar despesa');
    }
  };

  const handleDeleteSpending = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar esta despesa?')) return;

    try {
      await spendingService.deleteSpending(id);
      showSuccess('Despesa deletada com sucesso!');
      await loadSpendings();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao deletar despesa');
    }
  };

  const totalSpent = filteredSpendings.reduce((sum, spending) => sum + spending.amount, 0);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">Carregando gastos...</p>
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meus Gastos</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Total do período: <span className="font-bold">R$ {totalSpent.toFixed(2)}</span>
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            + Adicionar Despesa
          </Button>
        </div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Buscar"
              placeholder="Digite a descrição..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="">Todas as categorias</option>
                {Object.entries(SPENDING_CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Lista de Gastos */}
        {filteredSpendings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400">Nenhum gasto encontrado</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {filteredSpendings.map((spending) => {
              const category = SPENDING_CATEGORIES[spending.category];
              const emotion = EMOTION_TYPES[spending.emotion];

              return (
                <motion.div
                  key={spending.id}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{category.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {spending.description}
                        </h4>
                        <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                          {category.label}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>{emotion.emoji} {emotion.label}</span>
                        <span>
                          {spending.necessity === 'necessidade' ? '✓ Necessário' : '✗ Desejo'}
                        </span>
                        <span>{spending.date.toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      R$ {spending.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDeleteSpending(spending.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
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