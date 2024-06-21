import { Controller, Get, Param } from '@nestjs/common';
import { SessionsWorkspacesService } from './sessions-workspaces.service';
import { Workspace } from '../../shared/entities/workspace.entity';

@Controller('sessions-workspaces')
export class SessionsWorkspacesController {
  constructor(private readonly service: SessionsWorkspacesService) {}

  @Get(':sessionId')
  async getWorkspacesBySession(
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    return this.service.getWorkspacesBySession(sessionId);
  }
}
