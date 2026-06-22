

import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { LoginForm } from '../../components/forms/LoginForm';
import { ROUTES } from '../../utils/constants';

export function LoginPage() {
  return (
    <div>
      <Hero
        title="Fazer Login"
        subtitle="Autenticação"
        description="Acesse sua conta para continuar sua jornada com o SoftMind."
      />

      <Section>
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <LoginForm />

            <div className="mt-6 text-center">
              <Link
                to="#"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    Ou
                  </span>
                </div>
              </div>

              <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <span>🔵</span>
                Continuar com Google
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
              Não tem conta?{' '}
              <Link
                to={ROUTES.SIGNUP}
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}