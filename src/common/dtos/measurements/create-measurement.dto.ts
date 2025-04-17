import { IsNumber, IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateMeasurementDto {
  @IsUUID()
  measurementId: string;

  @IsNumber()
  value: number;

  @IsString()
  unit: string;

  @IsDateString()
  date: string;
}
