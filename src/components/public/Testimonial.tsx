
import { motion } from 'framer-motion';

export interface TestimonialItem {
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialProps {
  item: TestimonialItem;
}

export function Testimonial({ item }: TestimonialProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col"
    >
      {/* Stars */}
      {item.rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < item.rating! ? 'text-yellow-400' : 'text-gray-300'}
            >
              ★
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1 italic">
        "{item.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
        {item.avatar && (
          <img
            src={item.avatar}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {item.name}
          </p>
          {item.role && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.role}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface TestimonialGridProps {
  items: TestimonialItem[];
  columns?: 1 | 2 | 3;
}

export function TestimonialGrid({ items, columns = 3 }: TestimonialGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
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
      className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Testimonial item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}