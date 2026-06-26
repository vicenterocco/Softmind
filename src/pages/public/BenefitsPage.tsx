import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { Card } from '../../components/public/Card';
import { Stats, type StatItem } from '../../components/public/Stats';
import { CTAButton } from '../../components/public/CTAButton';
import { ROUTES } from '../../utils/constants';

const benefits: StatItem[] = [
  {
    label: 'Redução em Gastos Impulsivos',
    value: '80%',
    icon: '📉',
    description: 'Média de redução em 3 meses',
  },
  {
    label: 'Aumento em Economia',
    value: '+150%',
    icon: '💰',
    description: 'Usuários economizam mais que antes',
  },
  {
    label: 'Melhora em Saúde Mental',
    value: '90%',
    icon: '😊',
    description: 'Relatam menos estresse e ansiedade',
  },
  {
    label: 'Satisfação de Usuários',
    value: '4.9/5',
    icon: '⭐',
    description: 'Nota média de avaliação',
  },
];

export function BenefitsPage() {
  return (
    <div>
      <Hero
        title="Benefícios do SoftMind"
        subtitle="Transforme sua vida financeira"
        description="Descubra como o SoftMind ajuda você a recuperar controle, economizar dinheiro e vencer a compulsão por compras."
      />

      <Section
        subtitle="Impacto"
        title="Resultados Reais"
      >
        <Stats items={benefits} columns={2} />
      </Section>

      <Section
        subtitle="Vantagens"
        title="Por que Escolher o SoftMind"
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Autoconhecimento"
            description="Entenda seus padrões de gasto, gatilhos emocionais e comportamentos."
            icon="🔍"
          />
          <Card
            title="Controle Financeiro"
            description="Ferramentas práticas para controlar gastos e atingir metas financeiras."
            icon="💼"
          />
          <Card
            title="Apoio Profissional"
            description="Acesso a psicólogos, psiquiatras e especialistas em educação financeira."
            icon="👨‍⚕️"
          />
          <Card
            title="Comunidade"
            description="Conecte-se com outras pessoas em jornadas similares e compartilhe experiências."
            icon="🤝"
          />
          <Card
            title="Privacidade"
            description="Seus dados são seus. Completa privacidade e segurança garantidas."
            icon="🔒"
          />
          <Card
            title="Acessibilidade"
            description="Plataforma intuitiva, acessível e disponível 24/7 em qualquer dispositivo."
            icon="📱"
          />
        </div>
      </Section>

      <Section
        subtitle="Transformação"
        title="Histórias de Transformação"
      >
        <div className="space-y-6">
          {[
            {
              name: 'Ana Silva',
              before: 'Gastava R$ 3.000/mês em compras impulsivas',
              after: 'Agora controla gastos e economiza R$ 800/mês',
              time: '3 meses',
            },
            {
              name: 'Carlos Santos',
              before: 'Acumulava dívidas crescentes de cartão',
              after: 'Quitou R$ 5.000 em dívidas e está livre',
              time: '6 meses',
            },
            {
              name: 'Mariana Costa',
              before: 'Sentia vergonha e culpa após cada compra',
              after: 'Recuperou autoestima e relacionamentos saudáveis',
              time: '4 meses',
            },
          ].map((story, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-indigo-600"
            >
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                {story.name}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Antes:</p>
                  <p className="text-red-600 dark:text-red-400">{story.before}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Depois:</p>
                  <p className="text-green-600 dark:text-green-400">{story.after}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tempo: {story.time}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        subtitle="Próxima Ação"
        title="Pronto para Mudar?"
        centered
      >
        <CTAButton
          label="Começar Gratuitamente"
          href={ROUTES.SIGNUP}
          variant="primary"
          size="lg"
        />
      </Section>
    </div>
  );
}