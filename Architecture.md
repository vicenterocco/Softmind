// Vraj

# 🏗️ Arquitetura do SoftMind

## 📊 Visão Geral

O SoftMind segue uma arquitetura moderna baseada em:

- **Frontend**: React 18 + TypeScript
- **Roteamento**: React Router v6
- **State Management**: Context API
- **Validação**: Zod + React Hook Form
- **Estilos**: Tailwind CSS
- **Animações**: Framer Motion
- **Testes**: Vitest + React Testing Library

---

## 🎯 Camadas da Aplicação

### 1. **Presentation Layer (Componentes)**

```
src/components/
├── shared/        # Componentes reutilizáveis (Button, Input, Modal, etc)
├── public/        # Componentes públicos (Header, Hero, Footer, etc)
├── forms/         # Componentes de formulário
└── layouts/       # Layouts (a implementar)
```

**Responsabilidades:**
- Renderizar UI
- Capturar entrada do usuário
- Emitir eventos

### 2. **State Management Layer (Contextos + Hooks)**

```
src/contexts/
├── AuthContext.tsx    # Gerencia estado de autenticação
└── ThemeContext.tsx   # Gerencia tema claro/escuro

src/hooks/
├── useAuth.ts         # Hook para usar AuthContext
├── useTheme.ts        # Hook para usar ThemeContext
└── useForm.ts         # Hook customizado para formulários
```

**Responsabilidades:**
- Gerenciar estado global
- Fornecer dados aos componentes
- Sincronizar estado com localStorage

### 3. **Data Access Layer (Serviços)**

```
src/services/
├── api.ts             # Cliente HTTP base
├── authService.ts     # Serviço de autenticação
└── contactService.ts  # Serviço de contato
```

**Responsabilidades:**
- Fazer requisições HTTP
- Transformar dados
- Tratamento de erros

### 4. **Business Logic Layer (Utilidades)**

```
src/utils/
├── validation.ts      # Schemas de validação (Zod)
├── formatting.ts      # Formatadores (moeda, data, etc)
├── constants.ts       # Constantes da aplicação
└── helpers.ts         # Funções auxiliares
```

**Responsabilidades:**
- Lógica de negócio
- Transformações de dados
- Constantes

### 5. **Type Layer**

```
src/types/
├── auth.ts            # Tipos de autenticação
├── user.ts            # Tipos de usuário
├── forms.ts           # Tipos de formulários
└── common.ts          # Tipos comuns
```

**Responsabilidades:**
- Definir interfaces TypeScript
- Garantir type-safety

---

## 🔄 Fluxo de Dados

```
┌─────────────┐
│ Usuário     │
│ (Interação) │
└──────┬──────┘
       │
       ▼
┌────────────────────┐
│ Componente React   │
│ (Presentation)     │
└──────┬─────────────┘
       │ (captura input)
       ▼
┌────────────────────┐
│ Hook / Context     │
│ (State Management) │
└──────┬─────────────┘
       │ (valida dados)
       ▼
┌────────────────────┐
│ Service            │
│ (API Call)         │
└──────┬─────────────┘
       │ (requisição HTTP)
       ▼
┌────────────────────┐
│ Backend API        │
└────────────────────┘
```

---

## 🔐 Proteção de Rotas

```typescript
// ProtectedRoute garante que apenas usuários autenticados acessem
<Route 
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🎨 Design Patterns Utilizados

### 1. **Context Pattern**
Para compartilhar estado sem prop drilling

```typescript
// Uso
const { user, login } = useAuth();
```

### 2. **Custom Hooks**
Para lógica reutilizável

```typescript
// useAuth.ts
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
```

### 3. **Service Layer**
Para separar lógica de API do componente

```typescript
// authService.ts
export const authService = new AuthService();

// Uso
await authService.login(data);
```

### 4. **Composition Pattern**
Componentes reutilizáveis compostos

```typescript
<Section title="Meu Título">
  <Card>
    <Button>Clique aqui</Button>
  </Card>
</Section>
```

---

## 📦 Fluxo de Autenticação

```
┌──────────────┐
│ SignupPage   │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ SignupForm       │
│ (validação Zod)  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ useAuth().signup │
│ (AuthContext)    │
└──────┬───────────┘
       │
       ▼
┌──────────────────────┐
│ authService.signup() │
│ (API Call)           │
└──────┬───────────────┘
       │
       ▼
┌──────────────────┐
│ Backend Response │
└──────┬───────────┘
       │
       ▼
┌──────────────────────┐
│ setSession()         │
│ (localStorage)       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────┐
│ Navigate         │
│ (/dashboard)     │
└──────────────────┘
```

---

## 🔒 Validação em Camadas

### 1. **Frontend (Zod)**
```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### 2. **Form Validation (React Hook Form)**
```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

### 3. **Sanitização (Helpers)**
```typescript
const sanitized = sanitizeInput(userInput);
```

### 4. **Backend Validation (API)**
Implementado no servidor

---

## 📡 Requisições HTTP

### Padrão de Requisição

```typescript
// src/services/api.ts
const response = await apiService.post('/endpoint', data);

if (response.success) {
  // Handle success
} else {
  // Handle error
}
```

### Estrutura de Resposta

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### Tratamento de Erros

```typescript
try {
  await authService.login(data);
} catch (error) {
  showToast.error(error.message);
}
```

---

## 🧪 Estratégia de Testes

### Estrutura de Diretórios

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
└── services/
    ├── authService.ts
    └── authService.test.ts
```

### Exemplo de Teste

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 🌍 Localization (i18n)

A implementar em próxima fase. Estrutura preparada em `src/utils/constants.ts`:

```typescript
export const SUPPORTED_LOCALES = ['pt-BR', 'en-US'] as const;
```

---

## 📈 Performance Otimizations

### Code Splitting
Vite automaticamente faz isso para rotas

### Image Optimization
Use formatos modernos (WebP)

### Bundle Analysis
```bash
npm run build -- --analyze
```

---

## 🔄 CI/CD Pipeline (A Implementar)

Sugestão: GitHub Actions

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

---

## 📚 Recursos Úteis

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Zod Documentation](https://zod.dev)

---

**Última atualização**: Junho 2026