import React, { useState } from 'react';
import { Hero } from '../../components/public/Hero';
import { Section } from '../../components/public/Section';
import { Input } from '../../components/shared/Input';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';

const professionals = [
  {
    id: '1',
    name: 'Dra. Carla Mendes',
    specialty: 'Psicóloga Clínica',
    description: 'Especialista em transtornos do controle de impulsos e oniomania.',
    city: 'São Paulo, SP',
    contact: '(11) 98765-4321',
    social: { instagram: '@carla.psicologia', whatsapp: 'link' },
    rating: 5,
  },
  {
    id: '2',
    name: 'Dr. João Silva',
    specialty: 'Psiquiatra',
    description: 'Especialista em transtornos afetivos e controle de impulsos.',
    city: 'Rio de Janeiro, RJ',
    contact: '(21) 99876-5432',
    social: { instagram: '@joao.psiquiatra', whatsapp: 'link' },
    rating: 5,
  },
  {
    id: '3',
    name: 'Marisa Santos',
    specialty: 'Terapeuta Financeira',
    description: 'Especialista em comportamento financeiro e educação monetária.',
    city: 'Belo Horizonte, MG',
    contact: '(31) 97654-3210',
    social: { instagram: '@marisa.financeira', whatsapp: 'link' },
    rating: 4,
  },
];

export function ProfessionalsPage() {
  const [searchCity, setSearchCity] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');

  const filtered = professionals.filter(
    p =>
      p.city.toLowerCase().includes(searchCity.toLowerCase()) &&
      p.specialty.toLowerCase().includes(searchSpecialty.toLowerCase())
  );

  return (
    <div>
      <Hero
        title="Encontre Profissionais Especializados"
        subtitle="Suporte profissional"
        description="Conecte-se com psicólogos, psiquiatras e terapeutas financeiros especializados em oniomania."
      />

      <Section
        subtitle="Busca"
        title="Filtrar Profissionais"
      >
        <div className="max-w-2xl mx-auto space-y-4">
          <Input
            label="Cidade"
            placeholder="Ex: São Paulo, SP"
            value={searchCity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchCity(e.target.value)}
            fullWidth
          />
          <Input
            label="Especialidade"
            placeholder="Ex: Psicólogo, Psiquiatra, Terapeuta"
            value={searchSpecialty}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchSpecialty(e.target.value)}
            fullWidth
          />
        </div>
      </Section>

      <Section
        subtitle="Profissionais"
        title="Resultados da Busca"
      >
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(prof => (
              <div
                key={prof.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {prof.name}
                      </h3>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">
                        {prof.specialty}
                      </p>
                    </div>
                    <div className="text-amber-400">★{prof.rating}</div>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {prof.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <p>📍 {prof.city}</p>
                    <p>📱 {prof.contact}</p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {prof.social.instagram && (
                      <a
                        href="#"
                        className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded text-xs hover:opacity-75 transition-opacity"
                      >
                        Instagram
                      </a>
                    )}
                    {prof.social.whatsapp && (
                      <a
                        href="#"
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded text-xs hover:opacity-75 transition-opacity"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nenhum profissional encontrado com esses critérios.
            </p>
            <button
              onClick={() => {
                setSearchCity('');
                setSearchSpecialty('');
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </Section>

      <Section
        subtitle="Próxima Ação"
        title="Quer se Registrar como Profissional?"
        centered
        dark
      >
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Se você é um profissional especializado em oniomania, entre em contato para se registrar
          em nosso diretório.
        </p>
        <Link to={ROUTES.CONTACT}>
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Registre-se
          </button>
        </Link>
      </Section>
    </div>
  );
}