import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from '../../shared/entities/workspace.entity';

@Injectable()
export class UsersWorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async getWorkspacesByUser(userId: number): Promise<Workspace[]> {
    const queryBuilder =
      this.workspaceRepository.createQueryBuilder('workspace');

    queryBuilder
      .leftJoinAndSelect('workspace.reservations', 'reservation')
      .leftJoin('workspace.user', 'user')
      .where('user.id = :userId', { userId });

    return await queryBuilder.getMany();
  }
}
