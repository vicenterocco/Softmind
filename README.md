// Vraj

# 🎯 SoftMind - Plataforma de Apoio ao Controle de Oniomania

## 📋 Sobre o Projeto

SoftMind é uma plataforma web especializada em apoio ao controle da oniomania (compulsão por compras). O sistema ajuda usuários a compreender padrões de consumo, reduzir compras impulsivas, controlar gastos e identificar gatilhos emocionais.

### ✨ Características Principais

- **Dashboard** - Visão completa de gastos e progresso
- **Análise de Padrões** - Gráficos inteligentes sobre comportamento de compra
- **Sistema Anti-Impulso** - Ferramentas para evitar compras impulsivas
- **Metas Financeiras** - Estabeleça e acompanhe objetivos
- **Diretório de Profissionais** - Conecte-se com especialistas
- **Comunidade** - Suporte e compartilhamento de experiências

---

## 🚀 Como Começar

### Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/vrajlok/softmind.git
cd softmind
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
# Edite .env.local com suas configurações
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run preview      # Visualiza build de produção
npm run type-check   # Verifica tipos TypeScript
npm run lint         # Executa linter
npm test             # Roda testes
npm test:ui          # Abre interface de testes
npm test:coverage    # Gera relatório de cobertura
```

---

## 🏗️ Estrutura do Projeto

```
src/
├── pages/              # Páginas da aplicação
│   ├── public/        # Páginas públicas (Home, About, etc)
│   └── auth/          # Páginas de autenticação
├── components/        # Componentes React
│   ├── public/        # Componentes públicos (Header, Hero, etc)
│   ├── forms/         # Componentes de formulário
│   └── shared/        # Componentes reutilizáveis (Button, Input, etc)
├── contexts/          # Context API (Auth, Theme)
├── hooks/             # Custom hooks
├── services/          # Serviços de API
├── types/             # Tipos TypeScript
├── utils/             # Utilitários (validação, formatação, etc)
├── styles/            # Estilos globais
├── App.tsx            # Componente raiz
└── main.tsx           # Ponto de entrada
```

---

## 🎨 Design System

### Cores Principais

- **Primary**: Indigo (`#6366f1`)
- **Secondary**: Pink (`#ec4899`)
- **Success**: Green (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Error**: Red (`#ef4444`)

### Tipografia

- **Font**: Inter (via Google Fonts)
- **Weights**: 400, 500, 600, 700

### Componentes Base

Todos os componentes seguem o padrão de design definido em `src/components/shared/`:

- `Button` - Botões com variações (primary, secondary, outline, ghost, danger)
- `Input` - Inputs com validação integrada
- `Modal` - Modal responsivo com animações
- `Loader` - Spinner/loader com variações de tamanho
- `Toast` - Sistema de notificações

---

## 🔐 Segurança

- ✅ Proteção contra XSS
- ✅ Validação frontend com Zod
- ✅ Sanitização de entradas
- ✅ Tratamento global de erros
- ✅ HTTPS em produção
- ✅ LGPD compliance

---

## 🧪 Testes

O projeto usa **Vitest** + **React Testing Library** para testes.

```bash
# Rodar testes
npm test

# Modo watch
npm test -- --watch

# Com UI
npm test:ui

# Cobertura
npm test:coverage
```

---

## 📱 Responsividade

O projeto é completamente responsivo com suporte para:

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1280px+

Breakpoints Tailwind: `sm`, `md`, `lg`, `xl`, `2xl`

---

## 🌙 Tema Claro/Escuro

O aplicativo suporta tema claro e escuro automaticamente:

- Detecta preferência do sistema
- Pode ser alterado manualmente
- Persiste em localStorage
- Usa CSS classes (`dark:*`)

---

## 📡 API Integration

A aplicação se conecta a uma API backend via `src/services/api.ts`:

```typescript
// Exemplo de uso
const response = await apiService.post('/auth/signup', data);
```

### Variáveis de Ambiente

```
VITE_API_URL=http://localhost:3000/api
```

---

## 🚢 Deploy

### Build para Produção

```bash
npm run build
```

Saída em `dist/`

### Plataformas Suportadas

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **AWS Amplify**
- **Heroku**
- **Digital Ocean**

---

## 📚 Dependências Principais

- **React 18** - UI library
- **React Router 6** - Roteamento
- **Tailwind CSS 3** - Estilos
- **Framer Motion** - Animações
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Icons

---

## 📖 Documentação

### Componentes

Todos os componentes estão documentados em suas respectivas pastas:

- `src/components/shared/` - Componentes base
- `src/components/public/` - Componentes públicos
- `src/components/forms/` - Componentes de formulário

### Services

- `src/services/api.ts` - Serviço de API
- `src/services/authService.ts` - Autenticação
- `src/services/contactService.ts` - Contato

### Hooks

- `useAuth` - Autenticação
- `useTheme` - Tema
- `useForm` - Formulários

---

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit as mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

## 👨‍💻 Autor

**Vicente** - [GitHub](https://github.com/vrajlok)

---

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato através do site.

---

## 🗺️ Roadmap

- [ ] Dashboard do usuário
- [ ] Painel administrativo
- [ ] API Backend
- [ ] App mobile (React Native)
- [ ] Integração com psicólogos
- [ ] Gamificação
- [ ] ML para análise de padrões

---

**Feito com ❤️ por Vicente**