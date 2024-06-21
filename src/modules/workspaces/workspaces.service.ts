import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Workspace, Room } from '../../shared/entities/index-entities';
import { CreateWorkspaceDto } from '../../shared/dtos/index-dtos';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    return await this.workspaceRepository.save(workspace);
  }

  async findAll(): Promise<Workspace[]> {
    const queryBuilder =
      this.workspaceRepository.createQueryBuilder('workspace');
    this.addRelationsToQueryBuilder(queryBuilder);
    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Workspace> {
    const queryBuilder =
      this.workspaceRepository.createQueryBuilder('workspace');
    this.addRelationsToQueryBuilder(queryBuilder);
    queryBuilder.where('workspace.id = :id', { id });
    const workspace = await queryBuilder.getOne();
    if (!workspace) {
      throw new NotFoundException(`Workspace's ID ${id} not found`);
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
      throw new NotFoundException(`Workspace's ID ${id} not found`);
    }
    return await this.workspaceRepository.save(workspace);
  }

  async remove(id: number): Promise<void> {
    const workspace = await this.workspaceRepository.findOne({ where: { id } });
    if (!workspace) {
      throw new NotFoundException(`Workspace's ID ${id} not found`);
    }
    await this.workspaceRepository.softRemove(workspace);
  }

  async findAvailableWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    const queryBuilder =
      this.workspaceRepository.createQueryBuilder('workspace');

    queryBuilder
      .leftJoinAndSelect('workspace.reservations', 'reservation')
      .leftJoinAndSelect('workspace.room', 'room')
      .where('room.id = :roomId', { roomId })
      .andWhere(
        '(reservation.sessionId IS NULL OR reservation.sessionId != :sessionId)',
        { sessionId },
      );

    return await queryBuilder.getMany();
  }

  private addRelationsToQueryBuilder(
    queryBuilder: SelectQueryBuilder<Workspace>,
  ): void {
    queryBuilder.leftJoinAndSelect('workspace.room', 'room');
    queryBuilder.leftJoinAndSelect('workspace.user', 'user');
    queryBuilder.leftJoinAndSelect('workspace.session', 'session');
  }
}
