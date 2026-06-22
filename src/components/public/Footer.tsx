// Vraj

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, EXTERNAL_LINKS } from '../../utils/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-2 font-bold text-lg text-white hover:opacity-80 transition-opacity mb-4"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                S
              </div>
              SoftMind
            </Link>
            <p className="text-sm text-gray-400">
              Ajudando pessoas a controlar gastos e construir relação saudável com o dinheiro.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={ROUTES.HOW_IT_WORKS}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.BENEFITS}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Benefícios
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PROFESSIONALS}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Profissionais
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.CHECKLIST}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={ROUTES.ABOUT}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Sobre Oniomania
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.FAQ}
                  className="hover:text-indigo-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.CONTACT}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">Redes Sociais</h3>
            <div className="flex gap-3">
              <a
                href={EXTERNAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                f
              </a>
              <a
                href={EXTERNAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href={EXTERNAL_LINKS.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                𝕏
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              &copy; {currentYear} SoftMind. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}