import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MeasurementValue } from './measurement-value.entity';

@Entity('body_parts')
export class BodyPart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'is_unilateral', default: false })
  isUnilateral: boolean;

  @OneToMany(() => MeasurementValue, (value) => value.bodyPart)
  measurementValues: MeasurementValue[];
}
