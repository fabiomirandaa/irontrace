# IronTrace

[🇧🇷 Versão em Português](README.pt-BR.md)

A NestJS-based body measurement tracking API with JWT authentication, TypeORM and PostgreSQL.

## Features

- **🔐 JWT Authentication**: Secure user registration and login with JWT tokens
- **👤 User Management**: User accounts with encrypted passwords (bcrypt)
- **📊 Body Parts Management**: Pre-seeded gym body parts (unilateral and center measurements)
- **📝 Measurement Logging**: Create measurement logs with multiple body part values (user-specific)
- **🔒 Protected Routes**: Measurements automatically linked to authenticated user
- **💾 Transactional Support**: All measurements are saved atomically
- **📈 History Tracking**: Query measurement history with filtering
## Entities

### User
- `id`: UUID (primary key)
- `email`: String (unique)
- `username`: String (unique)
- `password`: String (hashed with bcrypt)
- `fullName`: String
- `createdAt`: Timestamp

### BodyPart
- `name`: String (unique)
- `isUnilateral`: Boolean (supports LEFT/RIGHT measurements)

### MeasurementLog
- `date`: Timestamp
- `userId`: String (FK to User)
- Relation to User entity
## API Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "StrongPassword123!",
  "fullName": "John Doe"
}
```

#### POST /auth/login
Login and receive JWT access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /auth/profile
Get current authenticated user profile (requires Bearer token).

**Headers:**
```
Authorization: Bearer <access_token>
```

### Measurements

#### POST /measurements
Create a new measurement log with values (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
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

## Technologies

- **NestJS**: Progressive Node.js framework
- **TypeORM**: ORM for TypeScript
- **PostgreSQL**: Relational database
- **JWT**: JSON Web Tokens for authentication
- **Passport.js**: Authentication middleware
- **bcrypt**: Password hashing
- **class-validator**: DTO validation
- **Swagger/OpenAPI**: API documentation

## Security

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens expire after 24 hours
- Protected routes require valid Bearer token
- User ID is extracted from JWT payload, not client input
- Email and username uniqueness is enforced at database level

## Environment Variables

Create a `.env` file with:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=irontrace

# JWT
JWT_SECRET=your-secret-key-change-in-production

# Server
PORT=3000
NODE_ENV=development
```
**Query Parameters:**
- `userId` (optional): Filter by user ID
  ]
}
```

### GET /measurements/history
Get measurement history, optionally filtered by userId.

**Query Parameters:**
- `userId` (optional): Filter by user ID

## Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (for containerized deployment)
- PostgreSQL (if running locally)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start PostgreSQL (using Docker):
```bash
docker-compose up postgres -d
```

4. Run the application:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`
Swagger documentation at `http://localhost:3000/api`

### Docker Deployment

Build and run everything with Docker Compose:
```bash
docker-compose up --build
```

## Technologies

- **NestJS**: Progressive Node.js framework
- **TypeORM**: ORM for TypeScript
- **PostgreSQL**: Relational database
- **class-validator**: DTO validation
- **Swagger/OpenAPI**: API documentation
- **Docker**: Containerization