import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import {
  CreateMeasurementDto,
  MeasurementType,
} from '../../common/dtos/measurements/create-measurement.dto';

@UseGuards(JwtAuthGuard)
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Get()
  async findAll(@Request() req) {
    return this.measurementsService.findAll(req.user.userId);
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateMeasurementDto) {
    return this.measurementsService.create(req.user.userId, dto);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.measurementsService.delete(req.user.userId, id);
  }

  @Get('types')
  getTypes() {
    return Object.values(MeasurementType);
  }
}
