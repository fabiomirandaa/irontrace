import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

@ApiTags('measurements')
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new measurement log with values' })
  @ApiResponse({
    status: 201,
    description: 'Measurement log created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Body part not found' })
  async createMeasurement(@Body() createMeasurementDto: CreateMeasurementDto) {
    return this.measurementsService.createMeasurement(createMeasurementDto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get measurement history' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter by user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Measurement history retrieved successfully',
  })
  async getHistory(@Query('userId') userId?: string) {
    return this.measurementsService.getHistory(userId);
  }
}
