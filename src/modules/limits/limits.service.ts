import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export enum LimitType {
  EXERCISES = 'exercises',
  TEMPLATES = 'templates',
  WORKOUTS = 'workouts',
  MEASUREMENTS = 'measurements',
}

export const FreeLimits: Record<LimitType, number> = {
  [LimitType.EXERCISES]: 20,
  [LimitType.TEMPLATES]: 10,
  [LimitType.WORKOUTS]: 30,
  [LimitType.MEASUREMENTS]: 50,
};

@Injectable()
export class LimitsService {
  constructor(private prisma: PrismaService) {}

  async check(userId: string, type: LimitType, plan: string = 'free') {
    const limit = plan === 'free' ? FreeLimits[type] : Infinity;

    const count = await this.countResources(userId, type);
    if (count >= limit) {
      throw new ForbiddenException(
        `Você atingiu o limite de ${limit} ${type} no plano ${plan}.`,
      );
    }
  }

  private async countResources(
    userId: string,
    type: LimitType,
  ): Promise<number> {
    switch (type) {
      case LimitType.EXERCISES:
        return this.prisma.exercise.count({ where: { userId } });

      case LimitType.TEMPLATES:
        return this.prisma.workoutTemplate.count({ where: { userId } });

      case LimitType.WORKOUTS:
        const firstDayOfMonth = new Date();
        firstDayOfMonth.setDate(1);
        firstDayOfMonth.setHours(0, 0, 0, 0);
        return this.prisma.workout.count({
          where: {
            userId,
            createdAt: { gte: firstDayOfMonth },
          },
        });

      case LimitType.MEASUREMENTS:
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        return this.prisma.measurement.count({
          where: {
            userId,
            date: { gte: startOfMonth },
          },
        });

      default:
        return 0;
    }
  }
}
