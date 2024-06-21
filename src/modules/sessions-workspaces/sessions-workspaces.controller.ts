import { Controller, Get, Param } from '@nestjs/common';
import { SessionsWorkspacesService } from './sessions-workspaces.service';

@Controller('sessions-workspaces')
export class SessionsWorkspacesController {
  constructor(private readonly service: SessionsWorkspacesService) {}

  @Get(':sessionId')
  async getWorkspacesBySession(@Param('sessionId') sessionId: number) {
    return this.service.getWorkspacesBySession(sessionId);
  }
}
