import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Button } from '../../components/shared/Button';
import { Input } from '../../components/shared/Input';
import { useToast } from '../../components/shared/Toast';

export function ProfilePage() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
  });

  const handleSave = async () => {
    try {
      // TODO: Integrar com authService.updateProfile()
      showSuccess('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      showError('Erro ao atualizar perfil');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
          <Button
            variant={isEditing ? 'danger' : 'primary'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
        </div>

        {/* Avatar e Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              <div className="mt-2 flex gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                  ✓ Verificado
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full font-medium">
                  Membro desde {new Date(user?.createdAt || Date.now()).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <Input
              label="Nome Completo"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!isEditing}
              fullWidth
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
              fullWidth
            />
            <Input
              label="Telefone (opcional)"
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              fullWidth
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio (opcional)
              </label>
              <textarea
                value={formData.bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Conte sobre você..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                rows={4}
              />
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button fullWidth onClick={handleSave}>
                  Salvar Alterações
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Segurança */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            🔒 Segurança
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Alterar Senha</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Última alteração: há 3 meses
                </p>
              </div>
              <Button size="sm" variant="outline">
                Alterar
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Autenticação 2FA</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Não ativada. Recomendamos ativar para mais segurança
                </p>
              </div>
              <Button size="sm" variant="outline">
                Ativar
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Preferências */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            ⚙️ Preferências
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Notificações por Email
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receber lembretes e relatórios
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
              <input type="checkbox" className="w-5 h-5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Newsletter Semanal
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dicas e insights sobre finanças
                </p>
              </div>
            </label>
          </div>
        </motion.div>

        {/* Zona de Perigo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg p-8"
        >
          <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
            ⚠️ Zona de Perigo
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Essas ações são irreversíveis. Tenha cuidado!
          </p>
          <Button variant="danger" fullWidth>
            Deletar Conta
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}