import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from '../../shared/entities/index-entities';
import { WorkspaceService } from './workspaces.service';
import { WorkspaceController } from './workspaces.controller';
import { Room } from '../../shared/entities/room.entity'; // Importa la entidad Room si Workspace está relacionado con ella
import { Reservation } from '../../shared/entities/reservation.entity'; // Importa la entidad Reservation si Workspace está relacionado con ella

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Room, Reservation])],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
})
export class WorkspacesModule {}
