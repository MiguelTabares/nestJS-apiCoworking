import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @IsNumber()
  row: number;

  @IsNotEmpty()
  @IsNumber()
  column: number;

  @IsNotEmpty()
  roomId: number; // Este campo se utilizará para asociar el espacio de trabajo a una habitación (Room)
}
