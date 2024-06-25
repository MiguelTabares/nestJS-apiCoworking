import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Workspace } from './shared/entities/workspace.entity';
import { Session } from './shared/entities/session.entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('assign/:workspaceId/:sessionId')
  async assignWorkspaceToSession(
    @Param('workspaceId') workspaceId: number,
    @Param('sessionId') sessionId: number,
  ) {
    try {
      const reservation = await this.appService.assignWorkspaceToSession(
        workspaceId,
        sessionId,
      );
      return {
        message: 'Workspace assigned to session successfully',
        reservation,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  @ApiParam({
    name: 'roomId',
    type: 'number',
    required: true,
    description: 'With this parameter you search by the room id',
    examples: {
      example1: {
        value: 1,
      },
    },
  })
  @ApiParam({
    name: 'sessionId',
    type: 'number',
    required: true,
    description: 'With this parameter you search by the session id',
    examples: {
      example1: {
        value: 1,
      },
    },
  })
  @ApiOperation({ summary: 'Get available workspaces' })
  @ApiResponse({ status: 200, description: 'Workspaces' })
  @ApiResponse({
    status: 404,
    description: 'ERROR. a parameter has not been found',
  })
  @Get('available/:roomId/:sessionId')
  async getAvailableWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    try {
      const availableWorkspaces = await this.appService.getAvailableWorkspaces(
        roomId,
        sessionId,
      );
      if (!availableWorkspaces || availableWorkspaces.length === 0) {
        throw new HttpException(
          'No available workspaces found for this session and room',
          HttpStatus.NOT_FOUND,
        );
      }
      return availableWorkspaces;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiParam({
    name: 'roomId',
    type: 'number',
    required: true,
    description: 'With this parameter you search by the room id',
    examples: {
      example1: {
        value: 1,
      },
    },
  })
  @ApiParam({
    name: 'sessionId',
    type: 'number',
    required: true,
    description: 'With this parameter you search by the session id',
    examples: {
      example1: {
        value: 1,
      },
    },
  })
  @ApiOperation({ summary: 'Get ocupied workspaces' })
  @ApiResponse({ status: 200, description: 'Workspaces' })
  @ApiResponse({
    status: 404,
    description: 'ERROR. a parameter has not been found',
  })
  @Get('occupied/:roomId/:sessionId')
  getOccupiedWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    return this.appService.getOccupiedWorkspaces(roomId, sessionId);
  }

  @ApiOperation({ summary: 'Get session with the least available sessions' })
  @ApiResponse({ status: 200, description: 'Sessions' })
  @ApiResponse({
    status: 404,
    description: 'ERROR. a parameter has not been found',
  })
  @Get('sessions/most-occupied')
  getSessionsOrderedByMostOccupied(): Promise<Session[]> {
    return this.appService.getSessionsOrderedByMostOccupied();
  }

  @ApiOperation({ summary: 'Get session with most aviable sessions' })
  @ApiResponse({ status: 200, description: 'Sessions' })
  @ApiResponse({
    status: 404,
    description: 'ERROR. a parameter has not been found',
  })
  @Get('sessions/most-available')
  getSessionsOrderedByMostAvailable(): Promise<Session[]> {
    return this.appService.getSessionsOrderedByMostAvailable();
  }

  @ApiParam({
    name: 'userId',
    type: 'number',
    required: true,
    description: 'With this parameter you search by the user id',
    examples: {
      example1: {
        value: 1,
      },
    },
  })
  @ApiOperation({ summary: 'Get WorkSpaces assigned to the user' })
  @ApiResponse({ status: 200, description: 'Workspaces' })
  @ApiResponse({
    status: 404,
    description: 'ERROR. a parameter has not been found',
  })
  @Get('assigned-to-user/:userId')
  getWorkspacesAssignedToUser(
    @Param('userId') userId: number,
  ): Promise<Workspace[]> {
    return this.appService.getWorkspacesAssignedToUser(userId);
  }

  @ApiParam({
    name: 'sessionId',
    type: 'number',
    required: true,
    description: 'With this parameter you search by the session id',
    examples: {
      example1: {
        value: 1,
      },
    },
  })
  @ApiOperation({ summary: 'Get WorkSpaces assigned to the session' })
  @ApiResponse({ status: 200, description: 'Workspaces' })
  @ApiResponse({
    status: 404,
    description: 'ERROR. a parameter has not been found',
  })
  @Get('assigned-session/:sessionId')
  getWorkspacesAssignedToSession(
    @Param('sessionId') sessionId: number,
  ): Promise<Workspace[]> {
    return this.appService.getWorkspacesAssignedToSession(sessionId);
  }
}
