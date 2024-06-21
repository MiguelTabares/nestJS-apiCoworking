import { Controller, Get, Param } from '@nestjs/common';
import { RoomsSessionsService } from './rooms-sessions.service';
import { Workspace } from 'src/shared/entities/workspace.entity';

@Controller('rooms-sessions')
export class RoomsSessionsController {
  constructor(private readonly service: RoomsSessionsService) {}

  @Get(':roomId/:sessionId/available-workspaces')
  async getAvailableWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number,
  ) {
    return this.service.getAvailableWorkspaces(roomId, sessionId);
  }

  @Get(':roomId/:sessionId/occupied-workspaces')
  async getOccupiedWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    return this.service.getOccupiedWorkspaces(roomId, sessionId);
  }
}
