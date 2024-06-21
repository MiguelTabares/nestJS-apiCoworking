import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsSessionsController } from './rooms-sessions.controller';
import { RoomsSessionsService } from './rooms-sessions.service';
import { Room } from '../../shared/entities/room.entity';
import { Session } from '../../shared/entities/session.entity';
import { Workspace } from '../../shared/entities/workspace.entity';
import { WorkspaceService } from '../workspaces/workspaces.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Session, Workspace])],
  controllers: [RoomsSessionsController],
  providers: [RoomsSessionsService, WorkspaceService],
})
export class RoomsSessionsModule {}
