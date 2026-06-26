# 📡 API SoftMind - Documentação de Endpoints

**Base URL:** `http://localhost:3000/api`

**Autenticação:** Bearer Token JWT no header `Authorization`

---

## 🔐 AUTENTICAÇÃO

### POST `/auth/signup`
Criar nova conta de usuário.

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "SecurePass123!",
  "passwordConfirmation": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@example.com",
      "role": "user",
      "createdAt": "2024-06-24T10:00:00Z"
    },
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Errors:**
- `400` - Email já existe
- `400` - Senha fraca
- `422` - Validação falhou

---

### POST `/auth/login`
Fazer login.

**Request:**
```json
{
  "email": "joao@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@example.com"
    },
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Errors:**
- `401` - Credenciais inválidas
- `404` - Usuário não encontrado

---

### POST `/auth/refresh`
Renovar token JWT.

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

---

### POST `/auth/logout`
Fazer logout (invalida refresh token).

**Headers:**
```
Authorization: Bearer eyJhbGc...
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

## 💰 GASTOS (SPENDING)

### GET `/spending?userId={userId}&startDate={date}&endDate={date}&category={category}`
Listar gastos com filtros opcionais.

**Query Params:**
- `userId` (required) - ID do usuário
- `startDate` (optional) - Data inicial (YYYY-MM-DD)
- `endDate` (optional) - Data final (YYYY-MM-DD)
- `category` (optional) - Categoria do gasto

**Headers:**
```
Authorization: Bearer eyJhbGc...
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "amount": 150.00,
      "category": "alimentacao",
      "description": "Mercado",
      "date": "2024-06-24",
      "necessity": "necessidade",
      "emotion": "neutro",
      "createdAt": "2024-06-24T10:00:00Z",
      "updatedAt": "2024-06-24T10:00:00Z"
    }
  ]
}
```

---

### GET `/spending/{id}`
Obter um gasto específico.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "amount": 150.00,
    "category": "alimentacao",
    "description": "Mercado",
    "date": "2024-06-24",
    "necessity": "necessidade",
    "emotion": "neutro",
    "createdAt": "2024-06-24T10:00:00Z",
    "updatedAt": "2024-06-24T10:00:00Z"
  }
}
```

---

### POST `/spending`
Criar novo gasto.

**Request:**
```json
{
  "userId": "uuid",
  "amount": 150.00,
  "category": "alimentacao",
  "description": "Compra no mercado",
  "date": "2024-06-24",
  "necessity": "necessidade",
  "emotion": "neutro"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "amount": 150.00,
    "category": "alimentacao",
    "description": "Compra no mercado",
    "date": "2024-06-24",
    "necessity": "necessidade",
    "emotion": "neutro",
    "createdAt": "2024-06-24T10:00:00Z",
    "updatedAt": "2024-06-24T10:00:00Z"
  }
}
```

**Validações:**
- `amount` > 0
- `category` válida (enum)
- `emotion` válida (enum)
- `necessity` válida (enum)
- `description` min 3 caracteres

---

### PUT `/spending/{id}`
Atualizar um gasto.

**Request:**
```json
{
  "amount": 200.00,
  "description": "Compra no mercado (atualizado)",
  "category": "alimentacao"
}
```

**Response (200):** Mesmo formato do POST

---

### DELETE `/spending/{id}`
Deletar um gasto.

**Response (204):** Sem conteúdo

**Errors:**
- `403` - Gasto não pertence ao usuário
- `404` - Gasto não encontrado

---

### GET `/spending/stats/{userId}?period={period}`
Obter estatísticas de gastos.

**Query Params:**
- `period` - `semana` | `mes` | `ano`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalSpent": 1500.00,
    "totalNecessary": 800.00,
    "totalWaste": 700.00,
    "averageByDay": 50.00,
    "byCategory": {
      "alimentacao": 450.00,
      "transporte": 280.00,
      "saude": 200.00,
      "lazer": 150.00,
      "eletronicos": 150.00,
      "roupas": 160.00,
      "casa": 0.00,
      "educacao": 0.00,
      "beleza": 0.00,
      "outros": 110.00
    },
    "byEmotion": {
      "feliz": 300.00,
      "triste": 150.00,
      "ansioso": 200.00,
      "estressado": 250.00,
      "entediado": 100.00,
      "impulsivo": 300.00,
      "neutro": 100.00
    },
    "byNecessity": {
      "necessidade": 800.00,
      "desejo": 700.00
    }
  }
}
```

---

## 📋 LISTA DE ESPERA (WAITLIST)

### GET `/waitlist/{userId}`
Listar itens na lista de espera.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "productName": "PlayStation 5",
      "estimatedPrice": 4000.00,
      "reason": "Jogar com amigos",
      "createdAt": "2024-05-25T10:00:00Z",
      "daysWaiting": 30,
      "purchased": false
    }
  ]
}
```

---

### POST `/waitlist`
Adicionar item à lista de espera.

**Request:**
```json
{
  "userId": "uuid",
  "productName": "PlayStation 5",
  "estimatedPrice": 4000.00,
  "reason": "Jogar com amigos",
  "purchased": false
}
```

**Response (201):** Mesmo formato do GET

---

### PUT `/waitlist/{id}`
Atualizar item (marcar como comprado).

**Request:**
```json
{
  "purchased": true
}
```

**Response (200):** Mesmo formato do GET

---

### DELETE `/waitlist/{id}`
Remover item da lista de espera.

**Response (204):** Sem conteúdo

---

## 🎯 METAS (GOALS)

### GET `/goals/{userId}?status={status}`
Listar metas do usuário.

**Query Params:**
- `status` (optional) - `ativa` | `concluida` | `cancelada`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "type": "economizar",
      "title": "Férias em Dezembro",
      "description": "Viajar para o exterior",
      "targetAmount": 3000.00,
      "currentAmount": 1500.00,
      "deadline": "2024-12-31",
      "status": "ativa",
      "category": "viagem",
      "createdAt": "2024-06-24T10:00:00Z",
      "updatedAt": "2024-06-24T10:00:00Z"
    }
  ]
}
```

---

### GET `/goals/{id}`
Obter uma meta específica.

**Response (200):** Mesmo formato do GET com lista

---

### POST `/goals`
Criar nova meta.

**Request:**
```json
{
  "userId": "uuid",
  "type": "economizar",
  "title": "Férias em Dezembro",
  "description": "Viajar para o exterior",
  "targetAmount": 3000.00,
  "currentAmount": 0.00,
  "deadline": "2024-12-31",
  "status": "ativa",
  "category": "viagem"
}
```

**Response (201):** Mesmo formato do GET

**Validações:**
- `targetAmount` > 0
- `deadline` no futuro
- `type` válido (enum)
- `title` min 3 caracteres

---

### PUT `/goals/{id}`
Atualizar uma meta.

**Request:**
```json
{
  "currentAmount": 2000.00,
  "status": "ativa"
}
```

**Response (200):** Mesmo formato do GET

---

### DELETE `/goals/{id}`
Deletar uma meta.

**Response (204):** Sem conteúdo

---

### GET `/goals/{id}/progress`
Obter progresso de uma meta.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "goalId": "uuid",
    "percentage": 50,
    "daysRemaining": 190,
    "amountNeeded": 1500.00,
    "onTrack": true,
    "estimatedCompletion": "2024-12-20"
  }
}
```

---

### POST `/goals/{id}/add`
Adicionar valor à meta.

**Request:**
```json
{
  "amount": 500.00
}
```

**Response (200):** Mesmo formato do GET com lista

---

## 👤 USUÁRIOS

### GET `/users/{id}`
Obter perfil do usuário.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "",
    "bio": "",
    "role": "user",
    "createdAt": "2024-06-24T10:00:00Z"
  }
}
```

---

### PUT `/users/{id}`
Atualizar perfil do usuário.

**Request:**
```json
{
  "name": "João Silva Santos",
  "phone": "11999999999",
  "bio": "Aprendendo a controlar meus gastos"
}
```

**Response (200):** Mesmo formato do GET

---

### PUT `/users/{id}/password`
Alterar senha.

**Request:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!",
  "newPasswordConfirmation": "NewPass456!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Senha alterada com sucesso"
}
```

**Errors:**
- `401` - Senha atual incorreta
- `400` - Nova senha fraca

---

## 📊 ANÁLISE

### GET `/analysis/spending-by-category/{userId}?period={period}`
Gastos agrupados por categoria.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "labels": ["Alimentação", "Transporte", "Lazer"],
    "datasets": [
      {
        "label": "Gastos",
        "data": [450, 280, 200],
        "borderColor": "#6366f1",
        "backgroundColor": "rgba(99, 102, 241, 0.1)"
      }
    ]
  }
}
```

---

### GET `/analysis/spending-by-emotion/{userId}?period={period}`
Gastos agrupados por emoção.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "labels": ["Feliz", "Triste", "Ansioso"],
    "datasets": [
      {
        "label": "Percentual",
        "data": [35, 15, 20]
      }
    ]
  }
}
```

---

### GET `/analysis/spending-trend/{userId}?period={period}`
Tendência de gastos ao longo do tempo.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "labels": ["01/06", "02/06", "03/06"],
    "datasets": [
      {
        "label": "Gastos Diários",
        "data": [50, 75, 60],
        "borderColor": "#ec4899",
        "fill": false
      }
    ]
  }
}
```

---

## 🔍 PADRÕES E CONVENTIONS

### Headers Necessários
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Formato de Respostas de Sucesso
```json
{
  "success": true,
  "data": { /* conteúdo */ }
}
```

### Formato de Respostas de Erro
```json
{
  "success": false,
  "error": "Descrição do erro",
  "code": "ERROR_CODE",
  "details": { /* detalhes adicionais */ }
}
```

### Códigos de Status HTTP
- `200` - OK
- `201` - Criado
- `204` - Sem conteúdo (sucesso, sem resposta)
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Não autorizado
- `404` - Não encontrado
- `422` - Entidade não processável (validação)
- `500` - Erro interno do servidor

### Enums

**Categorias:**
```
alimentacao | transporte | saude | lazer | eletronicos | roupas | casa | educacao | beleza | outros
```

**Emoções:**
```
feliz | triste | ansioso | estressado | entediado | impulsivo | neutro
```

**Necessidade:**
```
necessidade | desejo
```

**Tipo de Meta:**
```
economizar | reduzir | quitar_divida
```

**Status de Meta:**
```
ativa | concluida | cancelada
```

---

## 🚀 RATE LIMITING

- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário autenticado

**Headers de resposta:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1624080000
```

---

## 📝 NOTAS IMPORTANTES

1. **Autenticação:** Todos os endpoints (exceto `/auth/signup` e `/auth/login`) requerem token JWT
2. **Validação:** IDs de usuário devem ser validados para evitar acesso não autorizado
3. **Timestamps:** Sempre usar UTC ISO 8601
4. **Moeda:** Sempre R$ (Real Brasileiro), formato com 2 casas decimais
5. **Soft Deletes:** Considerar implementar soft deletes para auditoria
6. **Logs:** Logar todas as ações críticas (delete, password change, etc)

---

## 🔐 SEGURANÇA

- ✅ HTTPS obrigatório em produção
- ✅ JWT com expiração (15 minutos)
- ✅ Refresh tokens com expiração maior (7 dias)
- ✅ Hash de senhas com bcrypt (min 10 rounds)
- ✅ Validação CSRF em operações sensíveis
- ✅ Input sanitization
- ✅ Rate limiting
- ✅ CORS configurado corretamente