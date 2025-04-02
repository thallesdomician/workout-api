import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutDto } from '../workout/create-workout.dto';
import { CreateMeasurementDto } from '../measurements/create-measurement.dto';
import { CreateExerciseDto } from '../exercises/create-exercise.dto';
import { CreateTemplateDto } from '../templates/create-template.dto';

export class SyncPushDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutDto)
  workouts: CreateWorkoutDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeasurementDto)
  measurements: CreateMeasurementDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateDto)
  templates: CreateTemplateDto[];
}
