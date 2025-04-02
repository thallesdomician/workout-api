import { LimitType } from '../enum/limits.enum';

export const FreeLimits: Record<LimitType, number> = {
  [LimitType.EXERCISES]: 20,
  [LimitType.TEMPLATES]: 10,
  [LimitType.WORKOUTS]: 30,
  [LimitType.MEASUREMENTS]: 50,
};
