import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService, PrismaService, JwtAuthGuard],
  exports: [TemplatesService],
})
export class TemplatesModule {}
