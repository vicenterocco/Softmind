
import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { SignupForm } from '../../components/forms/SignupForm';
import { ROUTES } from '../../utils/constants';

export function SignupPage() {
  return (
    <div>
      <Hero
        title="Criar Conta"
        subtitle="Cadastro"
        description="Junte-se à comunidade SoftMind e comece sua jornada de recuperação hoje."
      />

      <Section>
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <SignupForm />

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Já tem conta?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  Faça login
                </Link>
              </p>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
              Ao se cadastrar, você concorda com nossos{' '}
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                política de privacidade
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section
        subtitle="Informação"
        title="Por que se cadastrar?"
        centered
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Seguro
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Seus dados são protegidos e privados
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Rápido
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Leva menos de 2 minutos
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-3">🆓</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Gratuito
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comece sem nenhum custo
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}