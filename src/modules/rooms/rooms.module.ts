import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './rooms.controller';
import { RoomService } from './rooms.service';
import { Room } from '../../shared/entities/index-entities';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomsModule {}
