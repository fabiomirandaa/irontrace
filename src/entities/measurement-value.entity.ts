import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MeasurementLog } from './measurement-log.entity';
import { BodyPart } from './body-part.entity';

export enum MeasurementSide {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
}

@Entity('measurement_values')
export class MeasurementValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  value: number;

  @Column({
    type: 'enum',
    enum: MeasurementSide,
  })
  side: MeasurementSide;

  @Column({ name: 'log_id' })
  logId: number;

  @Column({ name: 'body_part_id' })
  bodyPartId: number;

  @ManyToOne(() => MeasurementLog, (log) => log.values)
  @JoinColumn({ name: 'log_id' })
  log: MeasurementLog;

  @ManyToOne(() => BodyPart, (bodyPart) => bodyPart.measurementValues)
  @JoinColumn({ name: 'body_part_id' })
  bodyPart: BodyPart;
}
