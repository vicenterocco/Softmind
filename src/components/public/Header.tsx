 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../shared/Button';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { ROUTES } from '../../utils/constants';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Sobre', href: ROUTES.ABOUT },
    { label: 'Checklist', href: ROUTES.CHECKLIST },
    { label: 'Como Funciona', href: ROUTES.HOW_IT_WORKS },
    { label: 'Benefícios', href: ROUTES.BENEFITS },
    { label: 'Profissionais', href: ROUTES.PROFESSIONALS },
    { label: 'FAQ', href: ROUTES.FAQ },
    { label: 'Contato', href: ROUTES.CONTACT },
  ];

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-lg flex items-center justify-center text-white dark:text-gray-900">
            S
          </div>
          SoftMind
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Auth Buttons */}
          {isAuthenticated && user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
              >
                Sair
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button size="sm">
                  Cadastrar
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 space-y-2"
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {!isAuthenticated && (
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link to={ROUTES.LOGIN}>
                <Button variant="outline" fullWidth size="sm">
                  Login
                </Button>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button fullWidth size="sm">
                  Cadastrar
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </header>
  );
}