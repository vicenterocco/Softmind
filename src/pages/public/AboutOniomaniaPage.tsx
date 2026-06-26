import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { Card } from '../../components/public/Card';
import { CTAButton } from '../../components/public/CTAButton';
import { ROUTES } from '../../utils/constants';

export function AboutOniomaniaPage() {
  return (
    <div>
      <Hero
        title="Oniomania: Compulsão por Compras"
        subtitle="Entenda o problema"
        description="Saiba mais sobre a oniomania e como ela afeta a vida de milhares de pessoas em todo o mundo."
      />

      <Section
        subtitle="Definição"
        title="O que é Oniomania?"
        description="Oniomania, também conhecida como compulsão por compras, é um transtorno do controle de impulsos caracterizado pela necessidade irresistível de comprar."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Características Principais
            </h3>
            <ul className="space-y-3">
              {[
                'Impulso irresistível de comprar',
                'Alívio temporário de emoções negativas',
                'Culpa ou arrependimento após comprar',
                'Continuação apesar de consequências financeiras',
                'Dificuldade em controlar o comportamento',
                'Compras como escape ou automedicação',
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Gatilhos Comuns
            </h3>
            <ul className="space-y-3">
              {[
                'Emoções negativas (tristeza, ansiedade)',
                'Estresse e pressão do trabalho',
                'Solidão ou isolamento social',
                'Baja autoestima ou insegurança',
                'Promoções e ofertas especiais',
                'Comparação com outras pessoas',
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-pink-600 dark:text-pink-400 flex-shrink-0">
                    ⚠️
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        subtitle="Impacto"
        title="Consequências da Oniomania"
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Financeira"
            description="Dívidas crescentes, endividamento, dificuldade em pagar contas essenciais."
            icon="💸"
          />
          <Card
            title="Emocional"
            description="Culpa, arrependimento, vergonha, depressão, ansiedade e baixa autoestima."
            icon="💔"
          />
          <Card
            title="Social"
            description="Isolamento social, problemas nos relacionamentos, conflitos familiares."
            icon="🚫"
          />
        </div>
      </Section>

      <Section
        subtitle="Dados"
        title="Estatísticas Importantes"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '5-10%', label: 'População afetada' },
            { value: '80%', label: 'São mulheres' },
            { value: '1-40 mil', label: 'Gasto mensal médio' },
            { value: 'Treavel', label: 'Idade mais comum' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        subtitle="Esperança"
        title="Recuperação é Possível"
        description="Com as ferramentas certas, suporte profissional e determinação, é totalmente possível superar a compulsão por compras."
      >
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Abordagens Efetivas
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>✓ Terapia cognitivo-comportamental (TCC)</li>
              <li>✓ Aconselhamento financeiro</li>
              <li>✓ Grupos de apoio e comunidade</li>
              <li>✓ Desenvolvimento de estratégias de controle</li>
              <li>✓ Tratamento de problemas emocionais subjacentes</li>
            </ul>
          </div>

          <CTAButton
            label="Comece sua Jornada"
            href={ROUTES.SIGNUP}
            variant="primary"
          />
        </div>
      </Section>

      <Section
        subtitle="Próximos Passos"
        title="Como o SoftMind Pode Ajudar"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Autossuperação"
            description="Ferramentas e recursos para você entender e controlar seu comportamento de compra."
            icon="🎯"
          />
          <Card
            title="Suporte Profissional"
            description="Conecte-se com psicólogos, psiquiatras e especialistas em educação financeira."
            icon="👨‍⚕️"
          />
        </div>

        <div className="mt-8 text-center">
          <CTAButton
            label="Fazer Checklist de Sinais"
            href={ROUTES.CHECKLIST}
            variant="secondary"
          />
        </div>
      </Section>
    </div>
  );
}