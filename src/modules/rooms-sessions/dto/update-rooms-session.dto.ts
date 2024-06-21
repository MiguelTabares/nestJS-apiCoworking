import { PartialType } from '@nestjs/swagger';
import { CreateRoomsSessionDto } from './create-rooms-session.dto';

export class UpdateRoomsSessionDto extends PartialType(CreateRoomsSessionDto) {}
