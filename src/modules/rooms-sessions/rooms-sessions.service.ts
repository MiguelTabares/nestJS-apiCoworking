import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from '../../shared/entities/workspace.entity';
import { Room } from '../../shared/entities/room.entity';
import { Session } from '../../shared/entities/session.entity';

@Injectable()
export class RoomsSessionsService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async getAvailableWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException(`Room's ID ${roomId} not found`);
    }

    if (!room.workspaces) {
      await this.roomRepository
        .createQueryBuilder('room')
        .relation(Room, 'workspaces')
        .of(room)
        .loadMany();
    }

    const availableWorkspaces = room.workspaces.filter((workspace) => {
      return !workspace.session || workspace.session.id !== sessionId;
    });

    return availableWorkspaces;
  }

  async getOccupiedWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    const occupiedWorkspaces = await this.workspaceRepository
      .createQueryBuilder('workspace')
      .innerJoin('workspace.reservations', 'reservation')
      .innerJoin('reservation.session', 'session')
      .where('workspace.room.id = :roomId', { roomId })
      .andWhere('session.id = :sessionId', { sessionId })
      .getMany();

    return occupiedWorkspaces;
  }
}
