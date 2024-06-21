import { Injectable } from '@nestjs/common';
import { Workspace } from '../../shared/entities/workspace.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersWorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async getWorkspacesByUser(userId: number) {
    return this.workspaceRepository.find({
      where: { user: { id: userId } },
      relations: ['reservations'],
    });
  }
}
