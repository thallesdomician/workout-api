import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, PrismaService, JwtAuthGuard],
  exports: [ExercisesService],
})
export class ExercisesModule {}
