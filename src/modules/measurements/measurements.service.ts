import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { MeasurementLog } from '../../entities/measurement-log.entity';
import { MeasurementValue } from '../../entities/measurement-value.entity';
import { BodyPart } from '../../entities/body-part.entity';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(MeasurementLog)
    private measurementLogRepository: Repository<MeasurementLog>,
    @InjectRepository(MeasurementValue)
    private measurementValueRepository: Repository<MeasurementValue>,
    @InjectRepository(BodyPart)
    private bodyPartRepository: Repository<BodyPart>,
    private dataSource: DataSource,
  ) {}

  async createMeasurement(createMeasurementDto: CreateMeasurementDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate body parts exist (within transaction)
      const bodyPartIds = createMeasurementDto.values.map((v) => v.bodyPartId);
      const uniqueBodyPartIds = [...new Set(bodyPartIds)];
      const bodyParts = await queryRunner.manager
        .createQueryBuilder(BodyPart, 'bodyPart')
        .where('bodyPart.id IN (:...ids)', { ids: uniqueBodyPartIds })
        .getMany();

      if (bodyParts.length !== uniqueBodyPartIds.length) {
        throw new NotFoundException('One or more body parts not found');
      }

      // Create measurement log
      const log = queryRunner.manager.create(MeasurementLog, {
        userId: createMeasurementDto.userId,
        date: new Date(createMeasurementDto.date),
      });
      const savedLog = await queryRunner.manager.save(log);

      // Create measurement values
      const values = createMeasurementDto.values.map((valueDto) =>
        queryRunner.manager.create(MeasurementValue, {
          value: valueDto.value,
          side: valueDto.side,
          logId: savedLog.id,
          bodyPartId: valueDto.bodyPartId,
        }),
      );
      await queryRunner.manager.save(values);

      await queryRunner.commitTransaction();

      // Return the complete log with values
      return this.measurementLogRepository.findOne({
        where: { id: savedLog.id },
        relations: ['values', 'values.bodyPart'],
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getHistory(userId?: string) {
    const query = this.measurementLogRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.values', 'value')
      .leftJoinAndSelect('value.bodyPart', 'bodyPart')
      .orderBy('log.date', 'DESC');

    if (userId) {
      query.where('log.userId = :userId', { userId });
    }

    return query.getMany();
  }
}
