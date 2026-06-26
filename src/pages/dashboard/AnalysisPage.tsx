import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ChartCard } from '../../components/dashboard/DashboardCard';

export function AnalysisPage() {
  const mockChartData = {
    categories: ['Alimentação', 'Transporte', 'Lazer', 'Eletrônicos', 'Roupas'],
    values: [450, 280, 200, 150, 160],
  };

  const mockEmotions = {
    feliz: 35,
    triste: 15,
    ansioso: 20,
    estressado: 25,
    entediado: 5,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📊 Análise de Padrões
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Entenda seus hábitos de consumo
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gastos por Categoria */}
          <ChartCard title="Gastos por Categoria">
            <div className="flex flex-col justify-between h-full">
              {mockChartData.categories.map((category, index) => {
                const value = mockChartData.values[index];
                const maxValue = Math.max(...mockChartData.values);
                const percentage = (value / maxValue) * 100;

                return (
                  <motion.div key={category} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">R$ {value}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-indigo-600"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ChartCard>

          {/* Emoções e Compras */}
          <ChartCard title="Compras por Emoção">
            <div className="flex flex-col justify-between h-full">
              {Object.entries(mockEmotions).map(([emotion, percentage]) => {
                const emojis: Record<string, string> = {
                  feliz: '😊',
                  triste: '😢',
                  ansioso: '😰',
                  estressado: '😤',
                  entediado: '😑',
                };

                return (
                  <motion.div key={emotion} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {emojis[emotion]} {emotion}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full rounded-full bg-pink-600"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ChartCard>
        </div>

        {/* Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">💡 Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-6">
              <div className="text-3xl mb-2">📍</div>
              <p className="font-semibold text-gray-900 dark:text-white mb-1">Padrão Principal</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Você gasta mais com alimentação (36%)
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-lg p-6">
              <div className="text-3xl mb-2">⚠️</div>
              <p className="font-semibold text-gray-900 dark:text-white mb-1">Gatilho Principal</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Estresse aumenta gastos em 25%
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-6">
              <div className="text-3xl mb-2">✨</div>
              <p className="font-semibold text-gray-900 dark:text-white mb-1">Melhor Dia</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Você gasta menos nos finais de semana
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}