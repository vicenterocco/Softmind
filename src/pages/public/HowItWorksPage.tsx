
import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { Card } from '../../components/public/Card';
import { CTAButton } from '../../components/public/CTAButton';
import { ROUTES } from '../../utils/constants';

export function HowItWorksPage() {
  return (
    <div>
      <Hero
        title="Como o SoftMind Funciona"
        subtitle="Sua jornada em 4 etapas"
        description="Descubra como nossa plataforma foi projetada para ajudá-lo a controlar gastos e vencer a oniomania."
      />

      <Section
        subtitle="Processo"
        title="Sua Jornada no SoftMind"
      >
        <div className="space-y-12">
          {[
            {
              step: '1',
              title: 'Entendimento',
              description: 'Comece respondendo ao nosso checklist de sinais e crie um perfil detalhado. Assim você entenderá melhor seus padrões.',
              features: ['Checklist de Sinais', 'Análise de Padrões', 'Perfil Personalizado'],
              icon: '🔍',
            },
            {
              step: '2',
              title: 'Registro & Análise',
              description: 'Registre seus gastos com detalhes sobre emoções, necessidade vs desejo. Nossa IA analisa seus padrões em tempo real.',
              features: ['Registro de Gastos', 'Categorização Automática', 'Análise de Padrões'],
              icon: '📊',
            },
            {
              step: '3',
              title: 'Sistema Anti-Impulso',
              description: 'Antes de comprar, pause e responda perguntas reflexivas. Use a lista de espera para reavaliar compras em 7 dias.',
              features: ['Perguntas Reflexivas', 'Lista de Espera', 'Alertas Inteligentes'],
              icon: '🛑',
            },
            {
              step: '4',
              title: 'Suporte & Evolução',
              description: 'Acesse recursos educacionais e conecte-se com profissionais especializados. Acompanhe seu progresso e celebre vitórias.',
              features: ['Recursos Educacionais', 'Profissionais', 'Acompanhamento'],
              icon: '🎯',
            },
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {index % 2 === 0 ? (
                <>
                  <div>
                    <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-700 dark:text-indigo-300 font-bold mb-4">
                      Etapa {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {item.description}
                    </p>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-indigo-600 dark:text-indigo-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-6xl text-center">{item.icon}</div>
                </>
              ) : (
                <>
                  <div className="text-6xl text-center">{item.icon}</div>
                  <div>
                    <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-700 dark:text-indigo-300 font-bold mb-4">
                      Etapa {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {item.description}
                    </p>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-indigo-600 dark:text-indigo-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section
        subtitle="Ferramentas"
        title="Recursos Principais"
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Dashboard"
            description="Visão completa de seus gastos, metas e progresso em um único lugar."
            icon="📈"
          />
          <Card
            title="Análise Inteligente"
            description="Gráficos detalhados sobre padrões de gasto por categoria, emoção e período."
            icon="📊"
          />
          <Card
            title="Sistema Anti-Impulso"
            description="Ferramentas para pausar, refletir e evitar compras impulsivas."
            icon="🛑"
          />
          <Card
            title="Metas Financeiras"
            description="Estabeleça e acompanhe metas de economia e redução de gastos."
            icon="🎯"
          />
          <Card
            title="Diretório de Profissionais"
            description="Conecte-se com psicólogos, psiquiatras e terapeutas financeiros."
            icon="👨‍⚕️"
          />
          <Card
            title="Comunidade & Recursos"
            description="Acesse artigos, dicas e suporte de uma comunidade solidária."
            icon="🤝"
          />
        </div>
      </Section>

      <Section
        subtitle="Ação"
        title="Comece Sua Jornada Hoje"
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
            label="Ver Benefícios"
            href={ROUTES.BENEFITS}
            variant="secondary"
            size="lg"
          />
        </div>
      </Section>
    </div>
  );
}