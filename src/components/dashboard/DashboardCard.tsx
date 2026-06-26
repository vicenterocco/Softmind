import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: 'indigo' | 'pink' | 'green' | 'red' | 'amber';
  onClick?: () => void;
}

const colorStyles = {
  indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
  pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
};

export function DashboardCard({
  title,
  value,
  icon,
  trend,
  color = 'indigo',
  onClick,
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md
        transition-all duration-200 cursor-pointer
        ${onClick ? 'hover:shadow-lg' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.direction === 'up' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        <div className={`${colorStyles[color]} w-14 h-14 rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

interface ProgressCardProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  color?: string;
}

export function ProgressCard({
  title,
  current,
  target,
  unit,
  color = '#6366f1',
}: ProgressCardProps) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {current.toFixed(2)} / {target.toFixed(2)} {unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {percentage.toFixed(0)}% concluído
      </p>
    </motion.div>
  );
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="w-full h-80">
        {children}
      </div>
    </motion.div>
  );
}