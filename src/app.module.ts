import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { MeasurementsModule } from './modules/measurements/measurements.module';
import { SyncModule } from './modules/sync/sync.module';
import { LimitsModule } from './modules/limits/limits.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ExercisesModule,
    WorkoutsModule,
    TemplatesModule,
    MeasurementsModule,
    SyncModule,
    LimitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
