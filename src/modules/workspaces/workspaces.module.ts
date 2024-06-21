import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from '../../shared/entities/index-entities';
import { WorkspaceService } from './workspaces.service';
import { WorkspaceController } from './workspaces.controller';
import { Room } from '../../shared/entities/room.entity';
import { Reservation } from '../../shared/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Room, Reservation])],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
})
export class WorkspacesModule {}
