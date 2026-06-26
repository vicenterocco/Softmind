import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChecklistItem, ChecklistResult } from '../../types/forms';

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: '1',
    question: 'Você compra frequentemente para lidar com emoções negativas?',
    category: 'emotional',
    checked: false,
    severity: 'high',
  },
  {
    id: '2',
    question: 'Costuma fazer compras impulsivas que não planejou?',
    category: 'behavioral',
    checked: false,
    severity: 'high',
  },
  {
    id: '3',
    question: 'Sente culpa após fazer compras?',
    category: 'emotional',
    checked: false,
    severity: 'medium',
  },
  {
    id: '4',
    question: 'Esconde compras de familiares ou amigos?',
    category: 'behavioral',
    checked: false,
    severity: 'high',
  },
  {
    id: '5',
    question: 'Gasta mais do que pode permitir-se financeiramente?',
    category: 'financial',
    checked: false,
    severity: 'high',
  },
  {
    id: '6',
    question: 'Você continua comprando mesmo com dívidas?',
    category: 'financial',
    checked: false,
    severity: 'high',
  },
  {
    id: '7',
    question: 'Pensa frequentemente em compras mesmo não precisando?',
    category: 'behavioral',
    checked: false,
    severity: 'medium',
  },
  {
    id: '8',
    question: 'Usa compras como forma de celebrar momentos bons?',
    category: 'emotional',
    checked: false,
    severity: 'low',
  },
  {
    id: '9',
    question: 'Sente ansiedade ou irritação quando não pode comprar?',
    category: 'emotional',
    checked: false,
    severity: 'high',
  },
  {
    id: '10',
    question: 'Tem dificuldade em recusar ofertas ou promoções?',
    category: 'behavioral',
    checked: false,
    severity: 'medium',
  },
];

interface ChecklistFormProps {
  onResult?: (result: ChecklistResult) => void;
}

export function ChecklistForm({ onResult }: ChecklistFormProps) {
  const [items, setItems] = useState<ChecklistItem[]>(CHECKLIST_ITEMS);
  const [showResult, setShowResult] = useState(false);

  const result = useMemo<ChecklistResult>(() => {
    const checkedItems = items.filter(item => item.checked).length;
    const percentage = (checkedItems / items.length) * 100;

    const categories = {
      emotional: items.filter(i => i.category === 'emotional' && i.checked).length,
      behavioral: items.filter(i => i.category === 'behavioral' && i.checked).length,
      financial: items.filter(i => i.category === 'financial' && i.checked).length,
    };

    let severity: 'low' | 'medium' | 'high' = 'low';
    let recommendation = '';

    if (percentage >= 70) {
      severity = 'high';
      recommendation =
        'Seus sintomas indicam uma possível compulsão por compras. Recomendamos buscar ajuda profissional especializada.';
    } else if (percentage >= 40) {
      severity = 'medium';
      recommendation =
        'Você apresenta alguns sinais de compulsão. Considere implementar estratégias de controle e buscar orientação profissional se necessário.';
    } else {
      severity = 'low';
      recommendation =
        'Seus sintomas parecem leves, mas é importante manter a atenção e desenvolver hábitos saudáveis com o dinheiro.';
    }

    return {
      totalItems: items.length,
      checkedItems,
      percentage,
      severity,
      recommendation,
      categories,
    };
  }, [items]);

  const handleToggle = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleReset = () => {
    setItems(CHECKLIST_ITEMS);
    setShowResult(false);
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'text-green-600 dark:text-green-400';
      case 'medium':
        return 'text-amber-600 dark:text-amber-400';
      case 'high':
        return 'text-red-600 dark:text-red-400';
    }
  };

  const getSeverityBg = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'medium':
        return 'bg-amber-100 dark:bg-amber-900/30';
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30';
    }
  };

  return (
    <div className="space-y-6">
      {!showResult ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <input
                type="checkbox"
                id={item.id}
                checked={item.checked}
                onChange={() => handleToggle(item.id)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 cursor-pointer"
              />
              <div className="flex-1">
                <label htmlFor={item.id} className="block cursor-pointer">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.question}
                  </p>
                  <p className={`text-xs mt-1 ${getSeverityColor(item.severity || 'low')}`}>
                    {item.severity === 'high'
                      ? '⚠️ Crítico'
                      : item.severity === 'medium'
                        ? '⚠️ Moderado'
                        : '✓ Leve'}
                  </p>
                </label>
              </div>
            </motion.div>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowResult(true)}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Ver Resultado
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Resetar
            </button>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className={`p-6 rounded-lg ${getSeverityBg(result.severity)}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Seu Resultado
                </h3>
                <span
                  className={`text-3xl font-bold ${getSeverityColor(result.severity)}`}
                >
                  {result.percentage.toFixed(0)}%
                </span>
              </div>
              <p className={`text-sm font-medium ${getSeverityColor(result.severity)}`}>
                Severidade: {result.severity === 'high' ? 'Alta' : result.severity === 'medium' ? 'Moderada' : 'Baixa'}
              </p>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-300">
                {result.recommendation}
              </p>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {result.categories.emotional}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Emocional
                </p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {result.categories.behavioral}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Comportamental
                </p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {result.categories.financial}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Financeiro
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Refazer Checklist
              </button>
              <button
                onClick={() => onResult?.(result)}
                className="flex-1 px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                Próximo Passo
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}