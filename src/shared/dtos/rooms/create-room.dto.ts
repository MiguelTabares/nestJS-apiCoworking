import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  totalWorkspaces: number;
}
