import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @IsNotEmpty()
  @IsString()
  description: string;
}
