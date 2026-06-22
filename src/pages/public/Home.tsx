import React from 'react';
import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { Card } from '../../components/public/Card';
import { Stats, type StatItem } from '../../components/public/Stats';
import { CTAButton } from '../../components/public/CTAButton';
import { Testimonial, TestimonialGrid, type TestimonialItem } from '../../components/public/Testimonial';
import { ROUTES } from '../../utils/constants';

const stats: StatItem[] = [
  {
    label: 'Usuários Ajudados',
    value: '5,000+',
    icon: '👥',
    description: 'Pessoas em jornada de recuperação',
  },
  {
    label: 'Recursos',
    value: '100+',
    icon: '📚',
    description: 'Artigos, dicas e guias',
  },
  {
    label: 'Profissionais',
    value: '500+',
    icon: '💼',
    description: 'Especialistas disponíveis',
  },
];

const benefits = [
  {
    title: 'Entenda Seus Padrões',
    description: 'Analise seus gastos e descubra os gatilhos emocionais por trás de cada compra.',
    icon: '📊',
  },
  {
    title: 'Reduza Compras Impulsivas',
    description: 'Utilize ferramentas inteligentes para fazer pausas e refletir antes de comprar.',
    icon: '🛑',
  },
  {
    title: 'Controle Financeiro',
    description: 'Estabeleça metas e acompanhe seu progresso em tempo real.',
    icon: '💰',
  },
  {
    title: 'Suporte Profissional',
    description: 'Conecte-se com psicólogos, psiquiatras e terapeutas financeiros.',
    icon: '👨‍⚕️',
  },
  {
    title: 'Comunidade de Apoio',
    description: 'Compartilhe experiências e aprenda com outras pessoas.',
    icon: '🤝',
  },
  {
    title: 'Evolução Contínua',
    description: 'Acompanhe sua jornada e celebre cada progresso alcançado.',
    icon: '📈',
  },
];

const testimonials: TestimonialItem[] = [
  {
    name: 'Maria Silva',
    role: 'Usuária desde 2024',
    content:
      'O SoftMind mudou minha vida. Consegui reduzir compras impulsivas em 80% em apenas 3 meses. Sinto-me muito melhor financeiramente e emocionalmente.',
    rating: 5,
  },
  {
    name: 'João Santos',
    role: 'Consultor Financeiro',
    content:
      'Recomendo para todos os meus clientes que têm dificuldade com compras impulsivas. A ferramenta é intuitiva e realmente funciona.',
    rating: 5,
  },
  {
    name: 'Dr. Carlos Mendes',
    role: 'Psicólogo Clínico',
    content:
      'Uma ferramenta valiosa no tratamento da oniomania. Ajuda os pacientes a desenvolver autoconsciência e controle.',
    rating: 5,
  },
];

export function Home() {
  return (
    <div>
      {/* Hero */}
      <Hero
        title="Controle Suas Compras, Recupere Sua Vida"
        subtitle="Apoio especializado para oniomania"
        description="SoftMind é uma plataforma que ajuda você a entender, controlar e vencer a compulsão por compras, com ferramentas inteligentes e suporte profissional."
        cta={{
          label: 'Começar Gratuitamente',
          href: ROUTES.SIGNUP,
        }}
        secondaryCta={{
          label: 'Fazer Checklist',
          href: ROUTES.CHECKLIST,
        }}
        accent
      />

      {/* Stats */}
      <Section
        subtitle="Impacto Real"
        title="Números que Falam"
        centered
      >
        <Stats items={stats} />
      </Section>

      {/* Benefits */}
      <Section
        subtitle="Funcionalidades"
        title="Como o SoftMind Ajuda"
        description="Ferramentas completas para sua jornada de recuperação"
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              hover
            />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section
        title="Entenda Seus Padrões"
        description="Responda algumas perguntas para descobrir se você tem sinais de oniomania"
      >
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-8 text-center">
          <CTAButton
            label="Fazer Checklist"
            href={ROUTES.CHECKLIST}
            variant="primary"
          />
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        subtitle="Comunidade"
        title="Histórias de Sucesso"
        description="Veja como o SoftMind mudou a vida de pessoas reais"
        dark
      >
        <TestimonialGrid items={testimonials} />
      </Section>

      {/* Final CTA */}
      <Section
        title="Pronto para Começar?"
        description="Junte-se a milhares de pessoas que já transformaram suas vidas"
        centered
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton
            label="Criar Conta Gratuita"
            href={ROUTES.SIGNUP}
            variant="primary"
            size="lg"
          />
          <CTAButton
            label="Explorar Plataforma"
            href={ROUTES.HOW_IT_WORKS}
            variant="secondary"
            size="lg"
          />
        </div>
      </Section>
    </div>
  );
}