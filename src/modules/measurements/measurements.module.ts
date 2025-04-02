import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Module({
  controllers: [MeasurementsController],
  providers: [MeasurementsService, PrismaService, JwtAuthGuard],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
