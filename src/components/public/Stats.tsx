
import { motion } from 'framer-motion';

export interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: string;
  description?: string;
}

interface StatsProps {
  items: StatItem[];
  columns?: 2 | 3 | 4;
}

export function Stats({ items, columns = 3 }: StatsProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`grid grid-cols-1 ${gridCols[columns]} gap-6 lg:gap-8`}
    >
      {items.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {stat.icon && (
            <div className="text-3xl mb-3">{stat.icon}</div>
          )}
          <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            {stat.value}
            {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            {stat.label}
          </p>
          {stat.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {stat.description}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}