import { Module } from '@nestjs/common';
import { LimitsService } from './limits.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [LimitsService, PrismaService],
  exports: [LimitsService],
})
export class LimitsModule {}
