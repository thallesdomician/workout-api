import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService, PrismaService, JwtAuthGuard],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
