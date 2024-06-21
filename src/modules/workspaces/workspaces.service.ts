import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from '../../shared/entities/index-entities';
import { CreateWorkspaceDto } from '../../shared/dtos/index-dtos';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    return await this.workspaceRepository.save(workspace);
  }

  async findAll(): Promise<Workspace[]> {
    return await this.workspaceRepository.find({ relations: ['reservations'] });
  }

  async findOne(id: number): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });
    if (!workspace) {
      throw new NotFoundException(`Workspace's id ${id} is not found`);
    }
    return workspace;
  }

  async update(
    id: number,
    updateWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace> {
    const workspace = await this.workspaceRepository.preload({
      id,
      ...updateWorkspaceDto,
    });
    if (!workspace) {
      throw new NotFoundException(`Workspace's id ${id} is not found`);
    }
    return await this.workspaceRepository.save(workspace);
  }

  async remove(id: number): Promise<void> {
    const workspace = await this.workspaceRepository.findOne({ where: { id } });
    if (!workspace) {
      throw new NotFoundException(`Workspace's id ${id} is not found`);
    }
    await this.workspaceRepository.softRemove(workspace);
  }

  async findAvailableWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    const queryBuilder = this.workspaceRepository
      .createQueryBuilder('workspace')
      .leftJoin('workspace.reservations', 'reservation')
      .where('reservation.room.id = :roomId', { roomId })
      .andWhere('reservation.session.id = :sessionId', { sessionId })
      .andWhere('reservation.deletedAt IS NULL');

    return await queryBuilder.getMany();
  }
}
