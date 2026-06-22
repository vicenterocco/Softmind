// Vraj

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormType } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../shared/Toast';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { ROUTES } from '../../utils/constants';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError, showSuccess } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      await login(data);
      showSuccess('Login realizado com sucesso!');
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao fazer login';
      showError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="seu@email.com"
        {...register('email')}
        error={errors.email?.message}
        fullWidth
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        {...register('password')}
        error={errors.password?.message}
        fullWidth
      />

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          {...register('rememberMe')}
          className="w-4 h-4 rounded border-gray-300"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Manter-me conectado
        </span>
      </label>

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
      >
        Entrar
      </Button>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Não tem conta?{' '}
          <Link
            to={ROUTES.SIGNUP}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </form>
  );
}