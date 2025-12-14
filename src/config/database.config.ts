import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BodyPart } from '../entities/body-part.entity';
import { MeasurementLog } from '../entities/measurement-log.entity';
import { MeasurementValue } from '../entities/measurement-value.entity';
import { User } from '../entities/user.entity';

// TODO: Criar uma configuração mais decente aqui, senão vai dar merda. Depois uso melhor o .env
export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'irontrace',
  entities: [BodyPart, MeasurementLog, MeasurementValue, User],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
});
