import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodyPart } from '../entities/body-part.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(BodyPart)
    private bodyPartRepository: Repository<BodyPart>,
  ) {}

  async onModuleInit() {
    await this.seedBodyParts();
  }

  private async seedBodyParts() {
    const count = await this.bodyPartRepository.count();
    
    if (count > 0) {
      this.logger.log('Body parts already seeded, skipping...');
      return;
    }

    const bodyParts = [
      // Unilateral (left/right)
      { name: 'Biceps', isUnilateral: true },
      { name: 'Triceps', isUnilateral: true },
      { name: 'Forearm', isUnilateral: true },
      { name: 'Shoulder', isUnilateral: true },
      { name: 'Chest', isUnilateral: true },
      { name: 'Thigh', isUnilateral: true },
      { name: 'Calf', isUnilateral: true },
      { name: 'Glute', isUnilateral: true },
      
      // Center/bilateral
      { name: 'Waist', isUnilateral: false },
      { name: 'Hips', isUnilateral: false },
      { name: 'Neck', isUnilateral: false },
      { name: 'Upper Back', isUnilateral: false },
      { name: 'Lower Back', isUnilateral: false },
      { name: 'Abs', isUnilateral: false },
      { name: 'Weight', isUnilateral: false },
      { name: 'Body Fat %', isUnilateral: false },
    ];

    await this.bodyPartRepository.save(bodyParts);
    this.logger.log(`Seeded ${bodyParts.length} body parts`);
  }
}
