# 🚀 DEPLOYMENT - Guia Completo de Deploy

---

## 📋 PRÉ-REQUISITOS

- Node.js 18+
- PostgreSQL 14+
- Git
- Docker (opcional mas recomendado)
- Conta em serviço de hosting (Vercel, Heroku, AWS, DigitalOcean, etc)

---

## 🏗️ ARQUITETURA SUGERIDA

```
┌─────────────────────────────────────┐
│      Frontend (Vercel/Netlify)      │ ← React + Vite + TypeScript
├─────────────────────────────────────┤
│    API Backend (Heroku/Railway)     │ ← Node.js + Express/Fastify
├─────────────────────────────────────┤
│   PostgreSQL (AWS RDS/Heroku)       │ ← Database
└─────────────────────────────────────┘
```

---

## 🌐 OPÇÃO 1: DEPLOY NA VERCEL (Frontend)

### Passo 1: Prepare o projeto

```bash
# Clonar repositório
git clone https://github.com/vicenterocco/Softmind.git
cd Softmind

# Instalar dependências
npm install

# Build
npm run build
```

### Passo 2: Configure variáveis de ambiente

Crie `.env.production`:

```env
VITE_API_URL=https://api.softmind.com.br
VITE_APP_NAME=SoftMind
```

### Passo 3: Deploy na Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod

# Ou conectar GitHub na dashboard do Vercel
# https://vercel.com/new
```

### Passo 4: Configure domínio

1. Acesse https://vercel.com/dashboard
2. Vá para projeto → Settings → Domains
3. Adicione seu domínio customizado
4. Atualize DNS:
   - `A Record`: `76.76.19.0`
   - `CNAME`: `cname.vercel-dns.com`

---

## 🔧 OPÇÃO 2: DEPLOY DO BACKEND (Node.js + Express)

### Estrutura do Backend

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── spending.ts
│   │   ├── goals.ts
│   │   └── analysis.ts
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   └── app.ts
├── prisma/
│   └── schema.prisma
├── .env.example
├── package.json
├── tsconfig.json
└── Dockerfile
```

### Passo 1: Crie o backend

```bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv prisma @prisma/client typescript ts-node @types/express @types/node
npm install -D prisma typescript
```

### Passo 2: Configure Prisma

```bash
npx prisma init
```

Configure `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/softmind"
PORT=3000
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
JWT_REFRESH_SECRET="sua_chave_refresh_super_segura_aqui"
NODE_ENV="development"
```

### Passo 3: Exemplo de controller (auth.ts)

```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validações
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Nome, email e senha são obrigatórios',
      });
    }

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email já cadastrado',
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Gerar tokens
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      data: { user, token, refreshToken },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Credenciais inválidas',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Credenciais inválidas',
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
        refreshToken,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
    });
  }
};
```

### Passo 4: Exemplo de app.ts

```typescript
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Server is running' });
});

// Auth routes
// app.post('/api/auth/signup', authController.signup);
// app.post('/api/auth/login', authController.login);
// ... outras rotas

// Error handling
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### Passo 5: Deploy no Railway/Heroku

#### Railway (Recomendado)

```bash
# 1. Instale Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Crie novo projeto
railway init

# 4. Configure variáveis
railway variables

# 5. Deploy
railway up
```

#### Heroku

```bash
# 1. Instale Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Crie app
heroku create seu-app-name

# 4. Defina variáveis
heroku config:set JWT_SECRET="sua_chave_secreta"

# 5. Deploy
git push heroku main
```

---

## 🐘 OPÇÃO 3: DATABASE NO CLOUD

### AWS RDS

1. Acesse https://console.aws.amazon.com
2. Vá para RDS → Create database
3. Escolha PostgreSQL 14+
4. Configurações:
   - DB instance class: `db.t3.micro` (free tier)
   - Storage: 20 GB
   - Master username: `softmind_admin`
   - Master password: gere uma senha forte
5. Backup: automatic (7 dias)
6. Monitoring: ative CloudWatch

### Heroku PostgreSQL

```bash
heroku addons:create heroku-postgresql:hobby-dev
heroku config | grep DATABASE_URL
```

### DigitalOcean Managed Database

1. Acesse https://cloud.digitalocean.com
2. Databases → Create → PostgreSQL
3. Escolha plano
4. Configure firewall
5. Copie connection string

---

## 🐳 OPÇÃO 4: DOCKER (Recomendado para Produção)

### Dockerfile (Backend)

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci --only=production

# Build
COPY . .
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: softmind
      POSTGRES_USER: softmind_user
      POSTGRES_PASSWORD: strong_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U softmind_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://softmind_user:strong_password@db:5432/softmind
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

volumes:
  postgres_data:
```

### Build e Run

```bash
# Build
docker-compose build

# Run
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

---

## 📊 MONITORAMENTO E LOGS

### Sentry (Error Tracking)

```bash
npm install @sentry/node
```

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### LogRocket (Session Replay)

```bash
npm install logrocket
```

```typescript
import LogRocket from 'logrocket';

LogRocket.init('softmind/softmind');
```

### DataDog (APM)

```bash
npm install dd-trace
```

```typescript
require('dd-trace').init({
  hostname: 'localhost',
  port: 8126,
});
```

---

## 🔐 SSL/HTTPS

### Let's Encrypt (Gratuito)

```bash
# Usando Certbot
sudo certbot certonly --standalone -d softmind.com.br

# Configurar renovação automática
sudo certbot renew --quiet --no-eff-email
```

### Nginx com SSL

```nginx
server {
    listen 443 ssl http2;
    server_name softmind.com.br;

    ssl_certificate /etc/letsencrypt/live/softmind.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/softmind.com.br/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name softmind.com.br;
    return 301 https://$server_name$request_uri;
}
```

---

## 📋 CHECKLIST PRÉ-DEPLOY

- [ ] Todas variáveis de ambiente configuradas
- [ ] Banco de dados criado e testado
- [ ] Migrations rodadas com sucesso
- [ ] Testes passando (`npm test`)
- [ ] Build funcionando (`npm run build`)
- [ ] Documentação atualizada
- [ ] Secret keys geradas (JWT, etc)
- [ ] CORS configurado corretamente
- [ ] Rate limiting ativado
- [ ] Logs configurados
- [ ] Backup automático ativado
- [ ] Monitoramento ativado
- [ ] SSL/HTTPS configurado
- [ ] Email de contato testado
- [ ] Plano de rollback definido

---

## 🚨 PROCESSO DE DEPLOY

### 1. Staging
```bash
# Deploy em ambiente staging
git push origin develop
# Testes em staging
```

### 2. Production
```bash
# Merge para main
git checkout main
git merge develop

# Tag version
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags

# Deploy automático (CI/CD)
# GitHub Actions / GitLab CI / Jenkins
```

---

## 📈 ESCALABILIDADE

### Inicialmente
- 1 instância backend
- PostgreSQL managed
- CDN para estáticos

### Crescimento Médio
- Load balancer (Nginx/HAProxy)
- 2-3 instâncias backend
- Cache (Redis)
- Database replicas (read)

### Escala Alta
- Kubernetes (EKS/GKE)
- Microserviços
- Message queue (RabbitMQ/Kafka)
- Cache distribuído

---

## 💰 ESTIMATIVA DE CUSTOS

| Serviço | Plano | Custo/mês |
|---------|-------|-----------|
| Vercel | Pro | $20 |
| Railway | Hobby | Grátis |
| AWS RDS | db.t3.micro | ~$15 |
| CloudFlare | Pro | $20 |
| **TOTAL** | | ~$55 |

---

## 🔄 CI/CD COM GITHUB ACTIONS

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: npm run deploy
        env:
          DEPLOYMENT_KEY: ${{ secrets.DEPLOYMENT_KEY }}
```

---

## 🆘 TROUBLESHOOTING

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Database connection refused"
```bash
# Verificar variáveis de ambiente
echo $DATABASE_URL

# Testar conexão
psql $DATABASE_URL -c "SELECT 1"
```

### Erro: "Port already in use"
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📞 CONTATO PARA SUPORTE

- Email: suporte@softmind.com.br
- Discord: [link do servidor]
- GitHub Issues: [link do repositório]