// Vraj

# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o SoftMind! Este documento oferece orientações para contribuir ao projeto.

## 📋 Código de Conduta

Esperamos que todos os contribuidores sigam nosso código de conduta. Por favor, seja respeitoso e inclusivo.

## 🐛 Reportando Bugs

Antes de abrir uma issue, verifique se o bug já foi reportado. Se você encontrar um novo bug:

1. Use um título claro e descritivo
2. Descreva os passos exatos para reproduzir o problema
3. Forneça exemplos específicos para demonstrar os passos
4. Descreva o comportamento observado e o que esperava

## 🚀 Sugestões de Novas Funcionalidades

As sugestões são bem-vindas! Para propor uma nova feature:

1. Use um título claro e descritivo
2. Descreva detalhadamente a funcionalidade proposta
3. Forneça exemplos de uso
4. Liste possíveis desvantagens

## 📝 Processo de Desenvolvimento

### Setup

```bash
# Clone o repositório
git clone https://github.com/vrajlok/softmind.git
cd softmind

# Instale dependências
npm install

# Crie uma branch para sua feature
git checkout -b feature/sua-feature-aqui
```

### Desenvolvimento

```bash
# Inicie servidor de desenvolvimento
npm run dev

# Rodar testes
npm test

# Linter
npm run lint

# Verificar tipos
npm run type-check
```

### Commit Messages

Siga o padrão Conventional Commits:

```
feat: adicione nova feature
fix: corrija bug
docs: atualize documentação
style: mudanças de formatação
refactor: refatore código
test: adicione testes
chore: atualizações de dependências
```

### Pull Request

1. Atualize a documentação se necessário
2. Adicione testes para novas funcionalidades
3. Passe em todos os testes (`npm test`)
4. Faça linter passar (`npm run lint`)
5. Faça type-check passar (`npm run type-check`)

## 🎨 Padrões de Código

### TypeScript

- Use tipos explícitos sempre que possível
- Evite `any`
- Use interfaces para objetos complexos

### React

- Use functional components
- Use hooks
- Mantenha componentes pequenos e reutilizáveis
- Documente props com JSDoc

### Exemplo de componente bem estruturado:

```typescript
interface MyComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

/**
 * MyComponent - Descrição do componente
 * @param title - Título do componente
 * @param onSubmit - Callback ao submeter
 */
export function MyComponent({ title, onSubmit }: MyComponentProps) {
  // implementação
}
```

## 📚 Estrutura de Pastas

Respeite a estrutura existente:

```
src/
├── pages/         # Páginas
├── components/    # Componentes
├── hooks/         # Custom hooks
├── services/      # Serviços
├── types/         # Tipos TypeScript
└── utils/         # Funções auxiliares
```

## ✅ Checklist Antes de Submeter

- [ ] Código segue estilos do projeto
- [ ] Testes passam (`npm test`)
- [ ] Linter passa (`npm run lint`)
- [ ] Type-check passa (`npm run type-check`)
- [ ] Documentação foi atualizada
- [ ] Commit messages seguem padrão
- [ ] Branch está atualizada com main

## 📞 Questões?

Abra uma issue ou entre em contato através do GitHub.

---

**Obrigado por contribuir! 🎉**