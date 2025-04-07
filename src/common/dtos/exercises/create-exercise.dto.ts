import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BodyPart, EquipmentType } from '../../enums/exercises';

export class CreateExerciseDto {
  @IsOptional()
  @IsString()
  externalId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(BodyPart)
  bodyPart: BodyPart;

  @IsEnum(EquipmentType)
  equipment: EquipmentType;

  @IsString()
  @IsNotEmpty()
  target: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  secondaryMuscles?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  instructions?: string[];
}
