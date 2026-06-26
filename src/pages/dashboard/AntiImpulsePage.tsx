import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/shared/Toast';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Modal } from '../../components/shared/Modal';
import { Button } from '../../components/shared/Button';
import { Input } from '../../components/shared/Input';
import { spendingService } from '../../services/spendingService';
import type { WaitlistItem } from '../../types/spending';

export function AntiImpulsePage() {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const [waitlist, setWaitlist] = useState<WaitlistItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ productName: '', estimatedPrice: '', reason: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWaitlist();
  }, [user?.id]);

  const loadWaitlist = async () => {
    try {
      setIsLoading(true);
      // Mock data
      const mockWaitlist: WaitlistItem[] = [
        {
          id: '1',
          userId: user?.id || '',
          productName: 'PlayStation 5',
          estimatedPrice: 4000,
          reason: 'Jogar com amigos',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          daysWaiting: 30,
          purchased: false,
        },
        {
          id: '2',
          userId: user?.id || '',
          productName: 'Headset Gamer',
          estimatedPrice: 800,
          reason: 'Melhorar qualidade do áudio',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          daysWaiting: 7,
          purchased: false,
        },
      ];

      setWaitlist(mockWaitlist);
    } catch (error) {
      showError('Erro ao carregar lista de espera');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWaitlist = async () => {
    if (!formData.productName || !formData.estimatedPrice) {
      showError('Preencha todos os campos');
      return;
    }

    try {
      await spendingService.addToWaitlist({
        userId: user?.id || '',
        productName: formData.productName,
        estimatedPrice: parseFloat(formData.estimatedPrice),
        reason: formData.reason,
        purchased: false,
      });

      showSuccess('Produto adicionado à lista de espera!');
      setFormData({ productName: '', estimatedPrice: '', reason: '' });
      setIsModalOpen(false);
      await loadWaitlist();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao adicionar');
    }
  };

  const handleRemoveFromWaitlist = async (id: string) => {
    try {
      await spendingService.removeFromWaitlist(id);
      showSuccess('Removido da lista de espera');
      await loadWaitlist();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao remover');
    }
  };

  const handleMarkAsPurchased = async (id: string) => {
    try {
      await spendingService.markAsPurchased(id);
      showSuccess('Parabéns pela compra! 🎉');
      await loadWaitlist();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao atualizar');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const notPurchased = waitlist.filter((item) => !item.purchased);
  const purchased = waitlist.filter((item) => item.purchased);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🛑 Sistema Anti-Impulso
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Pausar antes de comprar. Esperar {notPurchased.length} dia{notPurchased.length !== 1 ? 's' : ''}.
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            + Adicionar à Lista
          </Button>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-6"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 Como Funciona?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Quando tiver vontade de comprar algo, adicione à lista de espera. Se após 7 dias ainda quiser,
            aí sim você compra. Muitas vezes o desejo passa! ✨
          </p>
        </motion.div>

        {/* Lista de Espera Ativa */}
        {notPurchased.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              ⏳ Esperando ({notPurchased.length})
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {notPurchased.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        💭 {item.reason}
                      </p>
                      <div className="mt-3 flex gap-4 text-sm">
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                          R$ {item.estimatedPrice.toFixed(2)}
                        </span>
                        <span className="text-amber-600 dark:text-amber-400">
                          ⏱️ {item.daysWaiting} dia{item.daysWaiting !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkAsPurchased(item.id)}
                        className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors"
                        title="Comprar"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleRemoveFromWaitlist(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Remover"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Comprados */}
        {purchased.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              ✅ Comprados ({purchased.length})
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {purchased.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-green-500 opacity-75"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white line-through">
                        {item.productName}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        R$ {item.estimatedPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-2xl">🎉</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {waitlist.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Sua lista de espera está vazia! 🎯
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              + Começar Agora
            </Button>
          </motion.div>
        )}
      </div>

      {/* Modal - Adicionar */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar à Lista de Espera"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Nome do Produto"
            placeholder="Ex: PlayStation 5"
            value={formData.productName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, productName: e.target.value })
            }
            fullWidth
          />
          <Input
            label="Preço Estimado (R$)"
            type="number"
            step="0.01"
            placeholder="Ex: 4000.00"
            value={formData.estimatedPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, estimatedPrice: e.target.value })
            }
            fullWidth
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Por que quer comprar? (opcional)
            </label>
            <textarea
              value={formData.reason}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              placeholder="Reflita sobre o verdadeiro motivo..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white resize-none"
              rows={3}
            />
          </div>
          <Button fullWidth onClick={handleAddToWaitlist}>
            Adicionar à Lista
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}