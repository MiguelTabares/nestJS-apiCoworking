import { Controller, Get, Param } from '@nestjs/common';
import { UsersWorkspacesService } from './users-workspaces.service';
import { Workspace } from '../../shared/entities/workspace.entity';

@Controller('users-workspaces')
export class UsersWorkspacesController {
  constructor(private readonly service: UsersWorkspacesService) {}

  @Get(':userId')
  async getWorkspacesByUser(
    @Param('userId') userId: number,
  ): Promise<Workspace[]> {
    return this.service.getWorkspacesByUser(userId);
  }
}
