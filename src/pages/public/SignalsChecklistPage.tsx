import { useNavigate } from 'react-router-dom';
import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { Card } from '../../components/public/Card';
import { ChecklistForm } from '../../components/forms/ChecklistForm';
import { CTAButton } from '../../components/public/CTAButton';
import { useToast } from '../../components/shared/Toast';
import type { ChecklistResult } from '../../types/forms';
import { ROUTES } from '../../utils/constants';

export function SignalsChecklistPage() {
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const handleChecklistResult = (result: ChecklistResult) => {
    showSuccess('Checklist concluído! Confira os próximos passos.');
    
    setTimeout(() => {
      if (result.severity === 'high') {
        navigate(ROUTES.PROFESSIONALS);
      } else {
        navigate(ROUTES.HOW_IT_WORKS);
      }
    }, 1500);
  };

  return (
    <div>
      <Hero
        title="Checklist de Sinais de Oniomania"
        subtitle="Avalie seus sintomas"
        description="Responda honestamente às perguntas abaixo para descobrir se você pode estar lidando com compulsão por compras."
      />

      <Section
        subtitle="Autoavaliação"
        title="Faça o Checklist"
        description="Este é um questionário informativo. Os resultados não substituem uma avaliação profissional."
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <ChecklistForm onResult={handleChecklistResult} />
          </div>
        </div>
      </Section>

      <Section
        subtitle="Informação"
        title="Como Interpretar os Resultados"
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Severidade Baixa (0-39%)"
            description="Você pode estar desenvolvendo hábitos de compra que precisam atenção, mas ainda não apresenta sinais claros de oniomania."
            icon="🟢"
          />
          <Card
            title="Severidade Moderada (40-69%)"
            description="Você apresenta sinais significativos de compulsão por compras. Recomendamos buscar orientação profissional."
            icon="🟡"
          />
          <Card
            title="Severidade Alta (70-100%)"
            description="Seus sintomas indicam uma possível oniomania. Procure um profissional de saúde mental especializado imediatamente."
            icon="🔴"
          />
        </div>
      </Section>

      <Section
        subtitle="Suporte"
        title="Recursos Disponíveis"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Profissionais Especializados"
            description="Conecte-se com psicólogos, psiquiatras e terapeutas financeiros que entendem oniomania."
            icon="👨‍⚕️"
          >
            <CTAButton
              label="Ver Profissionais"
              href={ROUTES.PROFESSIONALS}
              variant="primary"
              size="sm"
            />
          </Card>

          <Card
            title="Educação Financeira"
            description="Acesse artigos, dicas e guias para melhorar seu relacionamento com o dinheiro."
            icon="📚"
          >
            <CTAButton
              label="Explorar Recursos"
              href={ROUTES.BENEFITS}
              variant="primary"
              size="sm"
            />
          </Card>
        </div>
      </Section>

      <Section
        subtitle="Confiança"
        title="Confidencialidade Garantida"
        centered
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Seus dados são completamente privados. O checklist é apenas para sua autoavaliação pessoal.
            Nenhuma informação é armazenada ou compartilhada sem seu consentimento.
          </p>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Este questionário é apenas informativo e não constitui um diagnóstico médico.
            Para um diagnóstico adequado, consulte um profissional de saúde mental qualificado.
          </p>
        </div>
      </Section>

      <Section
        subtitle="Próximos Passos"
        title="Após Completar o Checklist"
        centered
      >
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-8">
          <ol className="space-y-4 text-left max-w-2xl mx-auto">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Analise seus resultados
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Entenda o que seus sintomas indicam
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Busque suporte profissional
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Conecte-se com especialistas se necessário
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Implemente estratégias
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use ferramentas para controlar compras impulsivas
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                4
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Acompanhe seu progresso
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Celebre cada passo na sua jornada de recuperação
                </p>
              </div>
            </li>
          </ol>
        </div>
      </Section>
    </div>
  );
}