import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LimitsService, LimitType } from './limits.service';

/**
 * Usage:
 * @UseGuards(LimitGuard(LimitType.EXERCISES))
 */
export function LimitGuard(limitType: LimitType) {
  @Injectable()
  class MixinLimitGuard implements CanActivate {
    constructor(
      public readonly limitsService: LimitsService,
      public readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user || !user.userId) {
        throw new ForbiddenException('Usuário não autenticado.');
      }

      await this.limitsService.check(
        user.userId,
        limitType,
        user.plan ?? 'free',
      );
      return true;
    }
  }

  return mixin(MixinLimitGuard);
}
