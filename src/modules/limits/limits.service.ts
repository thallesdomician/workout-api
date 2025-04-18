import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { I18nService } from 'nestjs-i18n';
import { translateType } from '../../common/helpers/translateType';

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
  constructor(
    private prisma: PrismaService,
    private i18n: I18nService,
  ) {}

  async check(userId: string, type: LimitType, plan: string = 'free') {
    const limit = plan === 'free' ? FreeLimits[type] : Infinity;
    const translatedType = await translateType(this.i18n, type);

    const count = await this.countResources(userId, type);
    if (count >= limit) {
      throw new ForbiddenException(
        this.i18n.t('common.errors.limitReached', {
          args: { limit, type: translatedType, plan },
        }),
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

      default:
        return 0;
    }
  }
}
