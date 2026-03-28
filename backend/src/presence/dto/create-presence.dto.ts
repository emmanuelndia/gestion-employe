import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export enum PresenceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  RETARD = 'retard',
}

export class CreatePresenceDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsDateString()
  @IsOptional()
  date_arrivee?: string;

  @IsDateString()
  @IsOptional()
  date_depart?: string;

  @IsEnum(PresenceStatus)
  @IsNotEmpty()
  status: PresenceStatus;
}
