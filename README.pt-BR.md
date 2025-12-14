# IronTrace

[🇺🇸 English Version](README.md)

Uma API de rastreamento de medidas corporais desenvolvida com NestJS, autenticação JWT, TypeORM e PostgreSQL.

## Recursos

- **🔐 Autenticação JWT**: Registro e login seguro de usuários com tokens JWT
- **👤 Gerenciamento de Usuários**: Contas de usuário com senhas criptografadas (bcrypt)
- **📊 Gerenciamento de Partes do Corpo**: Partes do corpo pré-carregadas (medidas unilaterais e centrais)
- **📝 Registro de Medidas**: Criação de logs de medidas com múltiplos valores de partes do corpo (específico por usuário)
- **🔒 Rotas Protegidas**: Medidas automaticamente vinculadas ao usuário autenticado
- **💾 Suporte Transacional**: Todas as medidas são salvas atomicamente
- **📈 Rastreamento de Histórico**: Consulta de histórico de medidas com filtros
- **📚 Documentação Swagger**: Documentação interativa da API com Bearer Auth
- **🐳 Dockerizado**: Deploy fácil com Docker Compose

## Entidades

### User (Usuário)
- `id`: UUID (chave primária)
- `email`: String (único)
- `username`: String (único)
- `password`: String (hash com bcrypt)
- `fullName`: String (nome completo)
- `createdAt`: Timestamp

### BodyPart (Parte do Corpo)
- `name`: String (único)
- `isUnilateral`: Boolean (suporta medidas ESQUERDA/DIREITA)

### MeasurementLog (Log de Medidas)
- `date`: Timestamp
- `userId`: String (FK para User)
- Relação com a entidade User

### MeasurementValue (Valor de Medida)
- `value`: Float (valor da medida)
- `side`: Enum (LEFT, RIGHT, CENTER)
- Relações com MeasurementLog e BodyPart

## Endpoints da API

### Autenticação

#### POST /auth/register
Registrar uma nova conta de usuário.

**Corpo da Requisição:**
```json
{
  "email": "usuario@exemplo.com",
  "username": "joaosilva",
  "password": "SenhaForte123!",
  "fullName": "João Silva"
}
```

#### POST /auth/login
Login e recebimento do token de acesso JWT.

**Corpo da Requisição:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "SenhaForte123!"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /auth/profile
Obter o perfil do usuário autenticado atual (requer token Bearer).

**Headers:**
```
Authorization: Bearer <access_token>
```

### Medidas

#### POST /measurements
Criar um novo log de medidas com valores (requer autenticação).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Corpo da Requisição:**
```json
{
  "date": "2024-01-15T10:00:00Z",
  "values": [
    {
      "bodyPartId": 1,
      "value": 35.5,
      "side": "LEFT"
    }
  ]
}
```

**Nota:** O `userId` é automaticamente extraído do token JWT, não do corpo da requisição.

#### GET /measurements/history
Obter histórico de medidas, opcionalmente filtrado por userId.

**Parâmetros de Query:**
- `userId` (opcional): Filtrar por ID do usuário

## Configuração

### Pré-requisitos
- Node.js 20+
- Docker & Docker Compose (para deploy containerizado)
- PostgreSQL (se executar localmente)

### Desenvolvimento Local

1. Instalar dependências:
```bash
npm install
```

2. Criar arquivo `.env`:
```bash
cp .env.example .env
```

Ou criar manualmente com:
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=irontrace

# JWT
JWT_SECRET=sua-chave-secreta-mude-em-producao

# Server
PORT=3000
NODE_ENV=development
```

3. Iniciar PostgreSQL (usando Docker):
```bash
docker-compose up postgres -d
```

4. Executar a aplicação:
```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`
Documentação Swagger em `http://localhost:3000/api`

### Deploy com Docker

Construir e executar tudo com Docker Compose:
```bash
docker-compose up --build
```

## Tecnologias

- **NestJS**: Framework progressivo para Node.js
- **TypeORM**: ORM para TypeScript
- **PostgreSQL**: Banco de dados relacional
- **JWT**: JSON Web Tokens para autenticação
- **Passport.js**: Middleware de autenticação
- **bcrypt**: Hash de senhas
- **class-validator**: Validação de DTOs
- **Swagger/OpenAPI**: Documentação da API

## Segurança

- Senhas são hasheadas usando bcrypt com 10 salt rounds
- Tokens JWT expiram após 24 horas
- Rotas protegidas requerem um token Bearer válido
- O ID do usuário é extraído do payload do JWT, não da entrada do cliente
- Unicidade de email e username é garantida no nível do banco de dados

## Fluxo de Uso

1. **Registrar**: `POST /auth/register` com email, username, password e fullName
2. **Login**: `POST /auth/login` com email e password → recebe `access_token`
3. **Criar Medida**: `POST /measurements` com header Authorization e dados da medida (sem userId no body)
4. **Perfil**: `GET /auth/profile` com header Authorization para ver dados do usuário
5. **Histórico**: `GET /measurements/history` para ver todas as medidas

## Variáveis de Ambiente

Crie um arquivo `.env` com:

```bash
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=irontrace

# JWT
JWT_SECRET=sua-chave-secreta-mude-em-producao

# Servidor
PORT=3000
NODE_ENV=development
```

## Estrutura do Projeto

```
src/
├── config/
│   └── database.config.ts       # Configuração do TypeORM
├── entities/
│   ├── user.entity.ts           # Entidade de usuário
│   ├── body-part.entity.ts      # Entidade de parte do corpo
│   ├── measurement-log.entity.ts # Log de medidas
│   └── measurement-value.entity.ts # Valores das medidas
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts       # Módulo de autenticação
│   │   ├── auth.service.ts      # Lógica de autenticação
│   │   ├── auth.controller.ts   # Endpoints de auth
│   │   ├── jwt.strategy.ts      # Estratégia JWT do Passport
│   │   ├── jwt-auth.guard.ts    # Guard para rotas protegidas
│   │   └── dto/
│   │       └── auth.dto.ts      # DTOs de registro/login
│   ├── users/
│   │   ├── users.module.ts      # Módulo de usuários
│   │   └── users.service.ts     # Serviço de usuários
│   └── measurements/
│       ├── measurements.module.ts
│       ├── measurements.service.ts
│       ├── measurements.controller.ts
│       └── dto/
│           └── create-measurement.dto.ts
├── app.module.ts                # Módulo raiz
└── main.ts                      # Bootstrap da aplicação
```

## Licença

MIT
