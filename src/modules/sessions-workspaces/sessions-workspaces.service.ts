import { Injectable } from '@nestjs/common';
import { Workspace } from '../../shared/entities/workspace.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionsWorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async getWorkspacesBySession(sessionId: number) {
    return this.workspaceRepository.find({
      where: { session: { id: sessionId } },
      relations: ['reservations'],
    });
  }
}
