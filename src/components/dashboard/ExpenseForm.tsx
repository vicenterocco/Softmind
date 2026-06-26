import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { useToast } from '../shared/Toast';
import { SPENDING_CATEGORIES, EMOTION_TYPES } from '../../types/spending';

const expenseSchema = z.object({
  amount: z.number().positive('Valor deve ser positivo'),
  category: z.string().refine(
    (val) => Object.keys(SPENDING_CATEGORIES).includes(val),
    'Categoria inválida'
  ),
  description: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
  emotion: z.string().refine(
    (val) => Object.keys(EMOTION_TYPES).includes(val),
    'Emoção inválida'
  ),
  necessity: z.enum(['necessidade', 'desejo']),
  date: z.string(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export function ExpenseForm({ onSubmit, isLoading = false }: ExpenseFormProps) {
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onFormSubmit = async (data: ExpenseFormData) => {
    try {
      await onSubmit(data);
      showSuccess('Despesa adicionada com sucesso!');
      reset();
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Erro ao adicionar despesa'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        label="Valor (R$)"
        type="number"
        step="0.01"
        {...register('amount', { valueAsNumber: true })}
        error={errors.amount?.message}
        fullWidth
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Categoria
        </label>
        <select
          {...register('category')}
          className={`
            w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white
            ${errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          `}
        >
          <option value="">Selecione uma categoria</option>
          {Object.entries(SPENDING_CATEGORIES).map(([key, category]) => (
            <option key={key} value={key}>
              {category.icon} {category.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      <Input
        label="Descrição"
        placeholder="O que foi comprado?"
        {...register('description')}
        error={errors.description?.message}
        fullWidth
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Como você se sentia?
        </label>
        <select
          {...register('emotion')}
          className={`
            w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white
            ${errors.emotion ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          `}
        >
          <option value="">Selecione uma emoção</option>
          {Object.entries(EMOTION_TYPES).map(([key, emotion]) => (
            <option key={key} value={key}>
              {emotion.emoji} {emotion.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tipo
        </label>
        <div className="flex gap-4">
          {(['necessidade', 'desejo'] as const).map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={type}
                {...register('necessity')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {type === 'necessidade' ? 'Necessidade' : 'Desejo'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Input
        label="Data"
        type="date"
        {...register('date')}
        error={errors.date?.message}
        fullWidth
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting || isLoading}
      >
        Adicionar Despesa
      </Button>
    </form>
  );
}