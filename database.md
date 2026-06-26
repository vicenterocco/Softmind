# 🗄️ DATABASE SoftMind - Schema e Estrutura

**Tipo:** PostgreSQL 14+

**Driver Recomendado:** Prisma, TypeORM ou Knex.js

---

## 📋 TABELAS

### 1. `users`
Tabela principal de usuários.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(254) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  bio TEXT,
  role VARCHAR(20) DEFAULT 'user' NOT NULL, -- user, admin, professional
  avatar_url VARCHAR(500),
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP, -- Soft delete
  
  CONSTRAINT email_format CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_users_deleted_at ON users(deleted_at);
```

---

### 2. `refresh_tokens`
Tokens de renovação para autenticação.

```sql
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  CONSTRAINT token_not_expired CHECK (expires_at > CURRENT_TIMESTAMP)
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
```

---

### 3. `spendings`
Registro de gastos/despesas dos usuários.

```sql
CREATE TABLE spendings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL, -- alimentacao, transporte, saude, etc
  description VARCHAR(500) NOT NULL,
  date DATE NOT NULL,
  necessity VARCHAR(20) NOT NULL, -- necessidade, desejo
  emotion VARCHAR(20) NOT NULL, -- feliz, triste, ansioso, estressado, entediado, impulsivo, neutro
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP, -- Soft delete
  
  CONSTRAINT amount_positive CHECK (amount > 0),
  CONSTRAINT valid_category CHECK (
    category IN ('alimentacao', 'transporte', 'saude', 'lazer', 'eletronicos', 
                  'roupas', 'casa', 'educacao', 'beleza', 'outros')
  ),
  CONSTRAINT valid_necessity CHECK (necessity IN ('necessidade', 'desejo')),
  CONSTRAINT valid_emotion CHECK (
    emotion IN ('feliz', 'triste', 'ansioso', 'estressado', 'entediado', 'impulsivo', 'neutro')
  )
);

CREATE INDEX idx_spendings_user_id ON spendings(user_id);
CREATE INDEX idx_spendings_date ON spendings(date DESC);
CREATE INDEX idx_spendings_category ON spendings(category);
CREATE INDEX idx_spendings_user_date ON spendings(user_id, date DESC);
CREATE INDEX idx_spendings_deleted_at ON spendings(deleted_at);
```

---

### 4. `goals`
Metas financeiras dos usuários.

```sql
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- economizar, reduzir, quitar_divida
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_amount DECIMAL(10, 2) NOT NULL,
  current_amount DECIMAL(10, 2) DEFAULT 0 NOT NULL,
  deadline DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'ativa' NOT NULL, -- ativa, concluida, cancelada
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP, -- Soft delete
  
  CONSTRAINT target_amount_positive CHECK (target_amount > 0),
  CONSTRAINT current_amount_positive CHECK (current_amount >= 0),
  CONSTRAINT current_lte_target CHECK (current_amount <= target_amount),
  CONSTRAINT deadline_future CHECK (deadline > CURRENT_DATE),
  CONSTRAINT valid_type CHECK (type IN ('economizar', 'reduzir', 'quitar_divida')),
  CONSTRAINT valid_status CHECK (status IN ('ativa', 'concluida', 'cancelada'))
);

CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_goals_deadline ON goals(deadline);
CREATE INDEX idx_goals_user_status ON goals(user_id, status);
CREATE INDEX idx_goals_deleted_at ON goals(deleted_at);
```

---

### 5. `goal_movements`
Histórico de movimentações nas metas.

```sql
CREATE TABLE goal_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(20) NOT NULL, -- add (adição), subtract (subtração)
  description VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  CONSTRAINT amount_positive CHECK (amount > 0),
  CONSTRAINT valid_type CHECK (type IN ('add', 'subtract'))
);

CREATE INDEX idx_goal_movements_goal_id ON goal_movements(goal_id);
CREATE INDEX idx_goal_movements_user_id ON goal_movements(user_id);
CREATE INDEX idx_goal_movements_created_at ON goal_movements(created_at DESC);
```

---

### 6. `waitlist_items`
Lista de espera para compras impulsivas (sistema anti-impulso).

```sql
CREATE TABLE waitlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  estimated_price DECIMAL(10, 2) NOT NULL,
  reason TEXT,
  purchased BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  CONSTRAINT estimated_price_positive CHECK (estimated_price > 0)
);

CREATE INDEX idx_waitlist_items_user_id ON waitlist_items(user_id);
CREATE INDEX idx_waitlist_items_purchased ON waitlist_items(purchased);
CREATE INDEX idx_waitlist_items_created_at ON waitlist_items(created_at DESC);
```

---

### 7. `professionals`
Profissionais disponíveis na plataforma (psicólogos, terapeutas, etc).

```sql
CREATE TABLE professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization VARCHAR(100) NOT NULL, -- psicólogo, psiquiatra, terapeuta, etc
  bio TEXT,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  phone VARCHAR(20),
  website VARCHAR(500),
  hourly_rate DECIMAL(10, 2),
  verification_status VARCHAR(20) DEFAULT 'pending' NOT NULL, -- pending, verified, rejected
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP,
  
  CONSTRAINT valid_verification CHECK (
    verification_status IN ('pending', 'verified', 'rejected')
  )
);

CREATE INDEX idx_professionals_user_id ON professionals(user_id);
CREATE INDEX idx_professionals_city_specialization ON professionals(city, specialization);
CREATE INDEX idx_professionals_verification_status ON professionals(verification_status);
```

---

### 8. `audit_logs`
Log de auditoria para ações críticas.

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- password_changed, spending_deleted, goal_created, etc
  resource_type VARCHAR(50) NOT NULL, -- user, spending, goal, etc
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  status VARCHAR(20) DEFAULT 'success', -- success, failure
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
```

---

### 9. `contact_messages`
Mensagens de contato da página pública.

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(254) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' NOT NULL, -- new, read, replied
  replied_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  CONSTRAINT valid_status CHECK (status IN ('new', 'read', 'replied'))
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
```

---

### 10. `newsletter_subscriptions`
Inscrições na newsletter.

```sql
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(254) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' NOT NULL, -- active, unsubscribed
  unsubscribed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  CONSTRAINT valid_status CHECK (status IN ('active', 'unsubscribed'))
);

CREATE INDEX idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_subscriptions_status ON newsletter_subscriptions(status);
```

---

## 📊 DIAGRAMA DE RELACIONAMENTOS

```
users (1) ─────── (N) spendings
       │
       ├──────── (N) goals
       │           │
       │           └──── (N) goal_movements
       │
       ├──────── (N) waitlist_items
       │
       ├──────── (N) refresh_tokens
       │
       └──────── (1) professionals
                   
audit_logs ─── *
contact_messages ─── *
newsletter_subscriptions ─── *
```

---

## 🔄 MIGRATIONS (Prisma)

Se usar Prisma, as migrations serão criadas automaticamente. Exemplo de schema.prisma:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                String    @id @default(uuid())
  name              String
  email             String    @unique
  passwordHash      String
  phone             String?
  bio               String?
  role              String    @default("user")
  avatarUrl         String?
  emailVerified     Boolean   @default(false)
  emailVerifiedAt   DateTime?
  twoFactorEnabled  Boolean   @default(false)
  twoFactorSecret   String?
  lastLogin         DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  deletedAt         DateTime?

  spendings         Spending[]
  goals             Goal[]
  goalMovements     GoalMovement[]
  waitlistItems     WaitlistItem[]
  refreshTokens     RefreshToken[]
  professional      Professional?

  @@index([email])
  @@index([createdAt])
}

model Spending {
  id          String   @id @default(uuid())
  userId      String
  amount      Decimal  @db.Decimal(10, 2)
  category    String
  description String
  date        DateTime @db.Date
  necessity   String
  emotion     String
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([date])
}

model Goal {
  id            String   @id @default(uuid())
  userId        String
  type          String
  title         String
  description   String?
  targetAmount  Decimal  @db.Decimal(10, 2)
  currentAmount Decimal  @default(0) @db.Decimal(10, 2)
  deadline      DateTime @db.Date
  status        String   @default("ativa")
  category      String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  deletedAt     DateTime?

  user          User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  movements     GoalMovement[]

  @@index([userId])
  @@index([status])
}

model GoalMovement {
  id          String   @id @default(uuid())
  goalId      String
  userId      String
  amount      Decimal  @db.Decimal(10, 2)
  type        String
  description String?
  createdAt   DateTime @default(now())

  goal        Goal     @relation(fields: [goalId], references: [id], onDelete: Cascade)
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([goalId])
  @@index([userId])
}

model WaitlistItem {
  id             String   @id @default(uuid())
  userId         String
  productName    String
  estimatedPrice Decimal  @db.Decimal(10, 2)
  reason         String?
  purchased      Boolean  @default(false)
  purchasedAt    DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([purchased])
}

model RefreshToken {
  id        String   @id @default(uuid())
  userId    String
  tokenHash String   @unique
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Professional {
  id                  String   @id @default(uuid())
  userId              String   @unique
  specialization      String
  bio                 String?
  city                String
  state               String
  phone               String?
  website             String?
  hourlyRate          Decimal? @db.Decimal(10, 2)
  verificationStatus  String   @default("pending")
  verifiedAt          DateTime?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  deletedAt           DateTime?

  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([city])
  @@index([verificationStatus])
}

model AuditLog {
  id            String   @id @default(uuid())
  userId        String?
  action        String
  resourceType  String
  resourceId    String?
  oldValues     Json?
  newValues     Json?
  ipAddress     String?
  userAgent     String?
  status        String   @default("success")
  errorMessage  String?
  createdAt     DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([createdAt])
}

model ContactMessage {
  id        String   @id @default(uuid())
  name      String
  email     String
  subject   String
  message   String
  status    String   @default("new")
  repliedAt DateTime?
  createdAt DateTime @default(now())

  @@index([status])
}

model NewsletterSubscription {
  id            String   @id @default(uuid())
  email         String   @unique
  status        String   @default("active")
  unsubscribedAt DateTime?
  createdAt     DateTime @default(now())

  @@index([status])
}
```

---

## 📈 ÍNDICES RECOMENDADOS

Para performance:

```sql
-- Queries frequentes
CREATE INDEX idx_user_spendings_date ON spendings(user_id, date DESC);
CREATE INDEX idx_user_goals_status ON goals(user_id, status);
CREATE INDEX idx_user_waitlist ON waitlist_items(user_id, created_at DESC);

-- Aggregations
CREATE INDEX idx_spendings_category_date ON spendings(category, date);
CREATE INDEX idx_spendings_emotion_date ON spendings(emotion, date);

-- Joins
CREATE INDEX idx_goal_movements_goal ON goal_movements(goal_id, created_at DESC);
```

---

## 🔐 SEGURANÇA DO BANCO

```sql
-- Criar role de aplicação
CREATE ROLE softmind_app WITH LOGIN PASSWORD 'strong_password_here';

-- Dar permissões mínimas necessárias
GRANT CONNECT ON DATABASE softmind TO softmind_app;
GRANT USAGE ON SCHEMA public TO softmind_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO softmind_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO softmind_app;

-- Revogar privilégios desnecessários
REVOKE TRUNCATE ON ALL TABLES IN SCHEMA public FROM softmind_app;
```

---

## 📊 QUERIES ÚTEIS

### Gastos do mês corrente
```sql
SELECT * FROM spendings
WHERE user_id = 'user_id'
AND date >= date_trunc('month', CURRENT_DATE)
AND deleted_at IS NULL
ORDER BY date DESC;
```

### Total gasto por categoria
```sql
SELECT category, SUM(amount) as total
FROM spendings
WHERE user_id = 'user_id'
AND date >= date_trunc('month', CURRENT_DATE)
AND deleted_at IS NULL
GROUP BY category
ORDER BY total DESC;
```

### Progresso de metas
```sql
SELECT 
  id,
  title,
  current_amount,
  target_amount,
  ROUND((current_amount / target_amount * 100)::numeric, 2) as percentage,
  EXTRACT(DAY FROM deadline - CURRENT_DATE) as days_remaining
FROM goals
WHERE user_id = 'user_id'
AND status = 'ativa'
AND deleted_at IS NULL;
```

### Gastos impulsivos (desejos)
```sql
SELECT * FROM spendings
WHERE user_id = 'user_id'
AND necessity = 'desejo'
AND deleted_at IS NULL
ORDER BY date DESC
LIMIT 10;
```

---

## 🚀 BACKUP E RESTORE

### Backup
```bash
pg_dump -U softmind_app -h localhost softmind > backup.sql
```

### Restore
```bash
psql -U softmind_app -h localhost softmind < backup.sql
```

### Backup automático diário
```bash
# Adicionar ao crontab
0 2 * * * pg_dump -U softmind_app -h localhost softmind | gzip > /backups/softmind_$(date +\%Y\%m\%d).sql.gz
```