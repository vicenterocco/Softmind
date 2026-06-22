// Vraj

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormType } from '../../utils/validation';
import { useToast } from '../shared/Toast';
import { contactService } from '../../services/contactService';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const { showError, showSuccess } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormType) => {
    try {
      await contactService.sendContactMessage(data);
      showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      reset();
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao enviar mensagem';
      showError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nome"
        placeholder="Seu nome"
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
        label="Assunto"
        placeholder="Qual é o motivo do contato?"
        {...register('subject')}
        error={errors.subject?.message}
        fullWidth
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Mensagem
        </label>
        <textarea
          {...register('message')}
          placeholder="Escreva sua mensagem aqui..."
          className={`
            w-full px-4 py-3 border rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2
            dark:bg-gray-800 dark:text-white dark:border-gray-600
            resize-none min-h-32
            ${
              errors.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            }
          `}
        />
        {errors.message && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
      >
        Enviar Mensagem
      </Button>
    </form>
  );
}