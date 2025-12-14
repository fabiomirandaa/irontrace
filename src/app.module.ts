import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { MeasurementsModule } from './modules/measurements/measurements.module';
import { SeedService } from './database/seed.service';
import { BodyPart } from './entities/body-part.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
    TypeOrmModule.forFeature([BodyPart]),
    MeasurementsModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
