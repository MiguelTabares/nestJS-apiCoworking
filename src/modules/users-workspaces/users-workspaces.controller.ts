import { Controller, Get, Param } from '@nestjs/common';
import { UsersWorkspacesService } from './users-workspaces.service';

@Controller('users-workspaces')
export class UsersWorkspacesController {
  constructor(private readonly service: UsersWorkspacesService) {}

  @Get(':userId')
  async getWorkspacesByUser(@Param('userId') userId: number) {
    return this.service.getWorkspacesByUser(userId);
  }
}
