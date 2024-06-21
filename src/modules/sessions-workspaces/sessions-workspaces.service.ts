import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from '../../shared/entities/workspace.entity';

@Injectable()
export class SessionsWorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async getWorkspacesBySession(sessionId: number): Promise<Workspace[]> {
    const queryBuilder =
      this.workspaceRepository.createQueryBuilder('workspace');

    queryBuilder
      .leftJoinAndSelect('workspace.reservations', 'reservation')
      .leftJoin('workspace.session', 'session')
      .where('session.id = :sessionId', { sessionId });

    return await queryBuilder.getMany();
  }
}
