import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { MeasurementsController } from './measurements.controller';

@Module({
  controllers: [MeasurementsController],
  providers: [MeasurementsService, PrismaService, JwtAuthGuard],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
