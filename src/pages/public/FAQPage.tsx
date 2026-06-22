
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';

const faqs = [
  {
    id: '1',
    question: 'O SoftMind é uma ferramenta diagnóstica?',
    answer:
      'Não. O SoftMind é uma ferramenta de apoio e autoconhecimento. O diagnóstico deve ser realizado por um profissional de saúde mental qualificado.',
  },
  {
    id: '2',
    question: 'Meus dados estão seguros?',
    answer:
      'Sim. Usamos criptografia de ponta e conformidade com LGPD. Seus dados nunca são compartilhados sem consentimento.',
  },
  {
    id: '3',
    question: 'Quanto custa o SoftMind?',
    answer:
      'O SoftMind oferece um plano gratuito com funcionalidades básicas e planos premium com recursos avançados. Consulte nossa página de preços.',
  },
  {
    id: '4',
    question: 'Posso acessar de qualquer dispositivo?',
    answer:
      'Sim. O SoftMind é totalmente responsivo e funciona em computadores, tablets e celulares iOS e Android.',
  },
  {
    id: '5',
    question: 'Como encontro profissionais especializados?',
    answer:
      'Em nossa seção "Profissionais", você pode buscar por especialidade e localização. Oferecemos uma lista verificada de psicólogos, psiquiatras e terapeutas.',
  },
  {
    id: '6',
    question: 'Posso usar o SoftMind junto com terapia?',
    answer:
      'Absolutamente! O SoftMind foi projetado para complementar o tratamento profissional. Compartilhe seus dados com seu terapeuta se desejar.',
  },
  {
    id: '7',
    question: 'O que fazer se tenho uma crise de impulsividade?',
    answer:
      'O SoftMind oferece ferramentas de emergência e números para contato com profissionais. Se estiver em risco, procure um pronto-socorro imediatamente.',
  },
  {
    id: '8',
    question: 'Há suporte ao cliente?',
    answer:
      'Sim! Oferecemos chat em tempo real, email e comunidade de usuários. Nossa equipe está disponível 24/7.',
  },
];

function FAQItem({ question, answer, isOpen, onToggle }: any) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white text-left">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600 dark:text-gray-400 flex-shrink-0 ml-4"
        >
          ▼
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800"
          >
            <p className="text-gray-700 dark:text-gray-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <Hero
        title="Perguntas Frequentes"
        subtitle="FAQ"
        description="Encontre respostas para as perguntas mais comuns sobre o SoftMind."
      />

      <Section>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map(faq => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </Section>

      <Section
        subtitle="Dúvida"
        title="Não Encontrou a Resposta?"
        centered
        dark
      >
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Se você não encontrou a resposta que procurava, entre em contato conosco. Nossa equipe
          está pronta para ajudar!
        </p>
        <a
          href="/contato"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Entrar em Contato
        </a>
      </Section>
    </div>
  );
}