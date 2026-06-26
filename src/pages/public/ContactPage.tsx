
import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { Card } from '../../components/public/Card';
import { ContactForm } from '../../components/forms/ContactForm';
import { EXTERNAL_LINKS } from '../../utils/constants';

export function ContactPage() {
  return (
    <div>
      <Hero
        title="Entre em Contato"
        subtitle="Estamos aqui para ajudar"
        description="Tem dúvidas, sugestões ou precisa de suporte? Envie uma mensagem para nós!"
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <ContactForm
                onSuccess={() => {
                  // Feedback ao usuário
                }}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card
              title="Horário"
              description="Disponível 24/7 via chat e email. Respostas em até 24 horas."
              icon="⏰"
            />

            <Card
              title="Email"
              description={EXTERNAL_LINKS.CONTACT_EMAIL}
              icon="✉️"
            />

            <Card
              title="Redes Sociais"
              description="Siga-nos e interaja conosco"
              icon="📱"
            >
              <div className="flex gap-2 mt-4">
                <a
                  href={EXTERNAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                >
                  Instagram
                </a>
                <a
                  href={EXTERNAL_LINKS.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section
        subtitle="Apoio"
        title="Precisa de Ajuda Imediata?"
        dark
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card
            title="Centro de Ajuda"
            description="Acesse nossos artigos e guias de autoajuda"
            icon="📚"
          />
          <Card
            title="Encontre um Profissional"
            description="Conecte-se com especialistas especializados em oniomania"
            icon="👨‍⚕️"
          />
        </div>
      </Section>
    </div>
  );
}