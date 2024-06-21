import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersWorkspacesController } from './users-workspaces.controller';
import { UsersWorkspacesService } from './users-workspaces.service';
import { Workspace } from '../../shared/entities/workspace.entity';
import { User } from '../../shared/entities/user.entity';
import { Reservation } from '../../shared/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, User, Reservation])],
  controllers: [UsersWorkspacesController],
  providers: [UsersWorkspacesService],
})
export class UsersWorkspacesModule {}
