import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SetType {
  WARM_UP = 'WARM_UP',
  FAILURE = 'FAILURE',
  DROPSHOT = 'DROPSHOT',
  OTHER = 'OTHER',
}

export class CreateSetDto {
  @IsNumber()
  @Min(0)
  weight: number;

  @IsNumber()
  @Min(1)
  reps: number;

  @IsEnum(SetType)
  @IsOptional()
  type: SetType;
}

export class CreateWorkoutExerciseDto {
  @IsString()
  exerciseId: string;

  @IsNumber()
  order: number;

  @IsString()
  nameSnapshot: string;

  @IsString()
  bodyPartSnapshot: string;

  @IsString()
  categorySnapshot: string;

  @IsOptional()
  @IsString()
  instructionsSnapshot?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSetDto)
  sets: CreateSetDto[];
}

export class CreateWorkoutDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutExerciseDto)
  exercises: CreateWorkoutExerciseDto[];

  @IsOptional()
  @IsString()
  createdFromTemplateId?: string;
}
