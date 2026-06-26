import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  children?: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({
  title,
  subtitle,
  description,
  icon,
  image,
  children,
  hover = true,
  className = '',
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md
        hover:shadow-lg transition-shadow duration-200
        overflow-hidden
        ${className}
      `}
    >
      {/* Image */}
      {image && (
        <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Icon */}
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl mb-4">
            {icon}
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-2">
            {subtitle}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {description}
          </p>
        )}

        {/* Children */}
        {children}
      </div>
    </motion.div>
  );
}