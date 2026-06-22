// Vraj

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../shared/Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
  accent?: boolean;
}

export function Hero({
  title,
  subtitle,
  description,
  cta,
  secondaryCta,
  backgroundImage,
  accent = false,
}: HeroProps) {
  return (
    <section
      className={`
        relative py-20 sm:py-32 overflow-hidden
        ${
          accent
            ? 'bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-900 dark:to-pink-900'
            : 'bg-white dark:bg-gray-900'
        }
      `}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Overlay if background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {subtitle && (
            <div className={`
              inline-block px-4 py-2 rounded-full font-medium text-sm mb-6
              ${
                accent
                  ? 'bg-white/20 text-white'
                  : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
              }
            `}>
              {subtitle}
            </div>
          )}

          <h1
            className={`
              text-4xl sm:text-5xl lg:text-6xl font-bold mb-6
              ${
                accent
                  ? 'text-white'
                  : 'text-gray-900 dark:text-white'
              }
            `}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`
                text-lg sm:text-xl max-w-2xl mx-auto mb-8
                ${
                  accent
                    ? 'text-white/90'
                    : 'text-gray-600 dark:text-gray-300'
                }
              `}
            >
              {description}
            </p>
          )}

          {(cta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {cta && (
                <Link to={cta.href}>
                  <Button
                    size="lg"
                    variant={accent ? 'primary' : 'primary'}
                  >
                    {cta.label}
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link to={secondaryCta.href}>
                  <Button
                    size="lg"
                    variant={accent ? 'outline' : 'outline'}
                  >
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}