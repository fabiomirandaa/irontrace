# IronTrace

A NestJS-based body measurement tracking API with TypeORM and PostgreSQL.

## Features

- **Body Parts Management**: Pre-seeded gym body parts (unilateral and center measurements)
- **Measurement Logging**: Create measurement logs with multiple body part values
- **Transactional Support**: All measurements are saved atomically
- **History Tracking**: Query measurement history with filtering
- **Swagger Documentation**: Interactive API documentation
- **Dockerized**: Easy deployment with Docker Compose

## Entities

### BodyPart
- `name`: String (unique)
- `isUnilateral`: Boolean (supports LEFT/RIGHT measurements)

### MeasurementLog
- `date`: Timestamp
- `userId`: String

### MeasurementValue
- `value`: Float
- `side`: Enum (LEFT, RIGHT, CENTER)
- Relations to MeasurementLog and BodyPart

## API Endpoints

### POST /measurements
Create a new measurement log with values (transactional).

**Request Body:**
```json
{
  "userId": "user123",
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