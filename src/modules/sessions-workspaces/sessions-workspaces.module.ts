import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsWorkspacesController } from './sessions-workspaces.controller';
import { SessionsWorkspacesService } from './sessions-workspaces.service';
import { Workspace } from '../../shared/entities/workspace.entity';
import { Session } from '../../shared/entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Session])],
  controllers: [SessionsWorkspacesController],
  providers: [SessionsWorkspacesService],
})
export class SessionsWorkspacesModule {}
