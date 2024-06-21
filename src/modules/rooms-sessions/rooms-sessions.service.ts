import { Injectable } from '@nestjs/common';
import { WorkspaceService } from '../workspaces/workspaces.service';
import { Workspace } from 'src/shared/entities/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsSessionsService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    private readonly workspaceService: WorkspaceService,
  ) {}

  async getAvailableWorkspaces(roomId: number, sessionId: number) {
    return this.workspaceService.findAvailableWorkspaces(roomId, sessionId);
  }

  async getOccupiedWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    return this.workspaceRepository
      .createQueryBuilder('workspace')
      .innerJoin('workspace.reservations', 'reservation')
      .innerJoin('reservation.session', 'session')
      .where('workspace.room.id = :roomId', { roomId })
      .andWhere('session.id = :sessionId', { sessionId })
      .getMany();
  }
}
