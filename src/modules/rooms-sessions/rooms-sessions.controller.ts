import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { RoomsSessionsService } from './rooms-sessions.service';
import { Workspace } from '../../shared/entities/workspace.entity';

@Controller('rooms-sessions')
export class RoomsSessionsController {
  constructor(private readonly service: RoomsSessionsService) {}

  @Get(':roomId/:sessionId/available-workspaces')
  async getAvailableWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    try {
      const availableWorkspaces = await this.service.getAvailableWorkspaces(
        roomId,
        sessionId,
      );
      return availableWorkspaces;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Throw other errors as-is
    }
  }

  @Get(':roomId/:sessionId/occupied-workspaces')
  async getOccupiedWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    try {
      const occupiedWorkspaces = await this.service.getOccupiedWorkspaces(
        roomId,
        sessionId,
      );
      return occupiedWorkspaces;
    } catch (error) {
      throw error;
    }
  }
}
