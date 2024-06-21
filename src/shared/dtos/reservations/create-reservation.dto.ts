import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateReservationDto {
  @IsOptional()
  @IsDateString()
  reservationTime?: Date;

  @IsNotEmpty()
  @IsNumber()
  workspaceId: number;

  @IsNotEmpty()
  @IsNumber()
  sessionId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
