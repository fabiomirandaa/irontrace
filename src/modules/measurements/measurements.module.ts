import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementsController } from './measurements.controller';
import { MeasurementsService } from './measurements.service';
import { MeasurementLog } from '../../entities/measurement-log.entity';
import { MeasurementValue } from '../../entities/measurement-value.entity';
import { BodyPart } from '../../entities/body-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeasurementLog, MeasurementValue, BodyPart]),
  ],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
})
export class MeasurementsModule {}
