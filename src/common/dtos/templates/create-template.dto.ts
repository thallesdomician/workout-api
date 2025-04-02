import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TemplateSetDto {
  @Min(0)
  weight: number;

  @Min(1)
  reps: number;
}

export class TemplateExerciseDto {
  @IsString()
  @IsNotEmpty()
  exerciseId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateSetDto)
  sets: TemplateSetDto[];
}

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateExerciseDto)
  exercises: TemplateExerciseDto[];
}
