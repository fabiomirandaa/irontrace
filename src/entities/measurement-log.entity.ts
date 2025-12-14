import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MeasurementValue } from './measurement-value.entity';
import { User } from './user.entity';

@Entity('measurement_logs')
export class MeasurementLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.measurementLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => MeasurementValue, (value) => value.log, { cascade: true })
  values: MeasurementValue[];
}
