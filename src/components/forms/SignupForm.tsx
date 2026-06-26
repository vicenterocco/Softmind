import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormType } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../shared/Toast';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { ROUTES } from '../../utils/constants';

export function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showError, showSuccess } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormType) => {
    try {
      await signup(data);
      showSuccess('Cadastro realizado com sucesso!');
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao cadastrar';
      showError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nome Completo"
        placeholder="João Silva"
        {...register('name')}
        error={errors.name?.message}
        fullWidth
      />

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
        helperText="Mínimo 8 caracteres, com letra maiúscula e número"
        fullWidth
      />

      <Input
        label="Confirmar Senha"
        type="password"
        placeholder="••••••••"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
        fullWidth
      />

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          {...register('acceptTerms')}
          className="mt-1 w-4 h-4 rounded border-gray-300"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Aceito os{' '}
          <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            termos de serviço
          </a>{' '}
          e a{' '}
          <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            política de privacidade
          </a>
        </span>
      </label>
      {errors.acceptTerms && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.acceptTerms.message}
        </p>
      )}

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
      >
        Criar Conta
      </Button>
    </form>
  );
}