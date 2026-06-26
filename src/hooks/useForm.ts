import { useState, useCallback } from 'react';
import type { FormError } from '../types/forms';

interface UseFormOptions<T> {
  onSubmit: (data: T) => Promise<void>;
  initialValues: T;
}

interface UseFormReturn<T> {
  values: T;
  errors: FormError[];
  isSubmitting: boolean;
  isDirty: boolean;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: string, message: string) => void;
  clearErrors: () => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(options.initialValues);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);

    // Limpar erro do campo ao editar
    setErrors(prev => prev.filter(err => err.field !== field));
  }, []);

  const setFieldError = useCallback((field: string, message: string) => {
    setErrors(prev => {
      const existing = prev.find(err => err.field === field);
      if (existing) {
        return prev.map(err =>
          err.field === field ? { ...err, message } : err
        );
      }
      return [...prev, { field, message }];
    });
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const resetForm = useCallback(() => {
    setValues(options.initialValues);
    clearErrors();
    setIsDirty(false);
  }, [options.initialValues, clearErrors]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearErrors();
      setIsSubmitting(true);

      try {
        await options.onSubmit(values);
        setIsDirty(false);
      } catch (error) {
        if (error instanceof Error) {
          setFieldError('general', error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, options, clearErrors, setFieldError]
  );

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    setFieldValue,
    setFieldError,
    clearErrors,
    resetForm,
    handleSubmit,
  };
}