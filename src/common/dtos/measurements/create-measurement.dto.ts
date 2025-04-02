import { IsIn, IsNumber, IsDateString, IsEnum } from 'class-validator';

export enum MeasurementType {
  WEIGHT = 'weight',
  WAIST = 'waist',
  CHEST = 'chest',
  BICEPS = 'biceps',
  HIPS = 'hips',
  SHOULDERS = 'shoulders',
  LEGS = 'legs',
  CALVES = 'calves',
  FOREARM = 'forearm',
}

export class CreateMeasurementDto {
  @IsEnum(MeasurementType)
  type: MeasurementType;

  @IsNumber()
  value: number;

  @IsIn(['kg', 'cm', 'mm', 'in'])
  unit: string;

  @IsDateString()
  date: string; // ISO format
}
