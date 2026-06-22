// Vraj

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
  dark?: boolean;
  centered?: boolean;
  className?: string;
}

export function Section({
  title,
  subtitle,
  description,
  children,
  dark = false,
  centered = true,
  className = '',
}: SectionProps) {
  return (
    <section
      className={`
        py-16 sm:py-20 lg:py-24
        ${dark ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-12 ${centered ? 'text-center' : ''}`}
          >
            {subtitle && (
              <div className={`
                inline-block px-4 py-2 rounded-full font-medium text-sm mb-4
                bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300
                ${centered ? '' : 'block'}
              `}>
                {subtitle}
              </div>
            )}

            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h2>
            )}

            {description && (
              <p className={`
                text-lg text-gray-600 dark:text-gray-400 max-w-2xl
                ${centered ? 'mx-auto' : ''}
              `}>
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Content */}
        {children}
      </div>
    </section>
  );
}