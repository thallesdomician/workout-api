import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum BodyPart {
  CHEST = 'CHEST',
  BACK = 'BACK',
  SHOULDERS = 'SHOULDERS',
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
  LEGS = 'LEGS',
  ABS = 'ABS',
  CARDIO = 'CARDIO',
  OTHER = 'OTHER',
}

export enum ExerciseCategory {
  BARBELL = 'BARBELL',
  DUMBBELL = 'DUMBBELL',
  MACHINE = 'MACHINE',
  BODYWEIGHT = 'BODYWEIGHT',
  CABLE = 'CABLE',
  ASSISTED = 'ASSISTED',
  CARDIO = 'CARDIO',
  OTHER = 'OTHER',
}

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(BodyPart)
  bodyPart: BodyPart;

  @IsEnum(ExerciseCategory)
  category: ExerciseCategory;

  @IsOptional()
  @IsString()
  instructions?: string;
}
