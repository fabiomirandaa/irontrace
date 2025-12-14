import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { MeasurementValue } from './measurement-value.entity';

@Entity('measurement_logs')
export class MeasurementLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => MeasurementValue, (value) => value.log, { cascade: true })
  values: MeasurementValue[];
}
