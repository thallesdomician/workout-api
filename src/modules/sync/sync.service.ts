import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ExercisesService } from '../exercises/exercises.service';
import { SyncPushDto } from '../../common/dtos/sync/sync-push.dto';

@Injectable()
export class SyncService {
  constructor(private prisma: PrismaService) {}

  async getBootstrapData(userId: string) {
    const [exercises] = await Promise.all([
      this.prisma.exercise.findMany({
        where: {
          OR: [{ userId }, { userId: null }],
        },
        orderBy: { name: 'asc' },
        include: {
          ExerciseMedia: {},
        },
      }),
    ]);

    return {
      exercises,
    };
  }

  async pushData(userId: string, dto: SyncPushDto) {
    const results = {
      workouts: [],
      measurements: [],
      exercises: [],
      templates: [],
    };

    return results;
  }
}
