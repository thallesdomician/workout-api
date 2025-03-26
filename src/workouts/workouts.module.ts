import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  imports: [PrismaModule],
})
export class WorkoutsModule {}
