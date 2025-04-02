import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WorkoutsService } from '../workouts/workouts.service';
import { MeasurementsService } from '../measurements/measurements.service';
import { ExercisesService } from '../exercises/exercises.service';
import { TemplatesService } from '../templates/templates.service';
import { SyncPushDto } from '../../common/dtos/sync/sync-push.dto';

@Injectable()
export class SyncService {
  constructor(
    private prisma: PrismaService,
    private workoutsService: WorkoutsService,
    private measurementsService: MeasurementsService,
    private exercisesService: ExercisesService,
    private templatesService: TemplatesService,
  ) {}

  async getBootstrapData(userId: string) {
    const [exercises, templates, measurements, workouts] = await Promise.all([
      this.prisma.exercise.findMany({
        where: {
          OR: [{ userId }, { userId: null }],
        },
        orderBy: { name: 'asc' },
      }),
      this.prisma.workoutTemplate.findMany({
        where: {
          OR: [{ userId }, { userId: null }],
        },
        include: {
          exercises: {
            include: {
              sets: true,
              exercise: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.measurement.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
      }),
      this.prisma.workout.findMany({
        where: { userId },
        include: {
          exercises: {
            include: {
              sets: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      exercises,
      templates,
      measurements,
      workouts,
    };
  }

  async pushData(userId: string, dto: SyncPushDto) {
    const results = {
      workouts: [],
      measurements: [],
      exercises: [],
      templates: [],
    };

    for (const workout of dto.workouts) {
      const created = await this.workoutsService.create(userId, workout);
      results.workouts.push(created);
    }

    for (const m of dto.measurements) {
      const created = await this.measurementsService.create(userId, m);
      results.measurements.push(created);
    }

    for (const e of dto.exercises) {
      const created = await this.exercisesService.create(userId, e);
      results.exercises.push(created);
    }

    for (const t of dto.templates) {
      const created = await this.templatesService.create(userId, t);
      results.templates.push(created);
    }

    return results;
  }
}
