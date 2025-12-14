import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MeasurementSide } from '../../../entities/measurement-value.entity';

export class MeasurementValueDto {
  @ApiProperty({ description: 'Body part ID', example: 1 })
  @IsNumber()
  @IsPositive()
  bodyPartId: number;

  @ApiProperty({ description: 'Measurement value', example: 35.5 })
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiProperty({
    description: 'Side of the body',
    enum: MeasurementSide,
    example: MeasurementSide.LEFT,
  })
  @IsEnum(MeasurementSide)
  side: MeasurementSide;
}

export class CreateMeasurementDto {
  @ApiProperty({
    description: 'Measurement date',
    example: '2024-01-15T10:00:00Z',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Array of measurement values',
    type: [MeasurementValueDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MeasurementValueDto)
  values: MeasurementValueDto[];
}
