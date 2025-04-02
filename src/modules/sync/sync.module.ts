import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MeasurementsModule } from '../measurements/measurements.module';
import { WorkoutsModule } from '../workouts/workouts.module';
import { ExercisesModule } from '../exercises/exercises.module';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [
    WorkoutsModule,
    MeasurementsModule,
    ExercisesModule,
    TemplatesModule,
  ],
  controllers: [SyncController],
  providers: [SyncService, PrismaService],
})
export class SyncModule {}
