import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './shared/entities/workspace.entity';
import { Repository } from 'typeorm';
import { Session } from './shared/entities/session.entity';
import { Reservation } from './shared/entities/reservation.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async assignWorkspaceToSession(
    workspaceId: number,
    sessionId: number,
  ): Promise<Reservation> {
    try {
      const workspace = await this.workspaceRepository.findOne({
        where: { id: workspaceId },
      });
      if (!workspace) {
        throw new Error(`Workspace's id ${workspaceId} not found`);
      }

      const session = await this.sessionRepository.findOne({
        where: { id: sessionId },
      });
      if (!session) {
        throw new Error(`Session with id ${sessionId} not found`);
      }
      const reservation = new Reservation();
      reservation.workspace = [workspace];
      reservation.session = [session];

      return await this.reservationRepository.save(reservation);
    } catch (error) {
      throw new Error(
        `Failed assigning workspace to session: ${error.message}`,
      );
    }
  }

  async getAvailableWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    try {
      const session = await this.sessionRepository.findOne({
        where: { id: sessionId },
      });
      if (!session) {
        throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
      }

      const query = this.workspaceRepository
        .createQueryBuilder('workspace')
        .leftJoin(
          'workspace.reservations',
          'reservation',
          'reservation.session_id= :sessionId',
          { sessionId },
        )
        .where('workspace.room.id = :roomId', { roomId })
        .andWhere(
          '(reservation.id IS NULL OR reservation.session_id != :sessionId)',
        )
        .orWhere(
          'reservation.session_id = :sessionId AND reservation.id IS NOT NULL',
        )
        .select([
          'workspace.id',
          'workspace.row',
          'workspace.column',
          'workspace.createdAt',
          'workspace.updatedAt',
          'workspace.deletedAt',
        ]);

      const availableWorkspaces = await query.getMany();

      return availableWorkspaces;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch available workspaces: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOccupiedWorkspaces(
    roomId: number,
    sessionId: number,
  ): Promise<Workspace[]> {
    try {
      const query = this.workspaceRepository
        .createQueryBuilder('workspace')
        .innerJoin(
          'workspace.reservations',
          'reservation',
          'reservation.session_id = :sessionId',
          { sessionId },
        )
        .where('workspace.room.id = :roomId', { roomId });

      const workspace = await query.getMany();

      if (!workspace)
        throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST);

      if (workspace.length == 0)
        throw new HttpException('This list is empty', 200);

      return workspace;
    } catch (err) {
      throw new HttpException(
        `ERROR. ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSessionsOrderedByMostOccupied(): Promise<Session[]> {
    try {
      const query = this.sessionRepository
        .createQueryBuilder('session')
        .leftJoin('session.reservations', 'reservation')
        .groupBy('session.id')
        .orderBy('COUNT(reservation.id)', 'DESC');

      const sessions = await query.getMany();

      if (!sessions)
        throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST);

      if (sessions.length == 0)
        throw new HttpException('This list is empty', 200);

      return sessions;
    } catch (err) {
      throw new HttpException(
        `ERROR. ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSessionsOrderedByMostAvailable(): Promise<Session[]> {
    try {
      const query = this.sessionRepository
        .createQueryBuilder('session')
        .leftJoin('session.reservations', 'reservation')
        .groupBy('session.id')
        .orderBy('COUNT(reservation.id)', 'ASC');

      const session = await query.getMany();

      if (!session)
        throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST);

      if (session.length == 0)
        throw new HttpException('This list is empty', 200);

      return session;
    } catch (err) {
      throw new HttpException(
        `ERROR. ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWorkspacesAssignedToUser(userId: number): Promise<Workspace[]> {
    try {
      const query = this.workspaceRepository
        .createQueryBuilder('workspace')
        .innerJoin(
          'workspace.reservations',
          'reservation',
          'reservation.user_id = :userId',
          { userId },
        );

      const workspace = await query.getMany();

      if (!workspace)
        throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST);

      // if (workspace.length == 0)
      //   throw new HttpException('This list is empty', 200);

      return workspace;
    } catch (err) {
      throw new HttpException(
        `ERROR. ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWorkspacesAssignedToSession(
    sessionId: number,
  ): Promise<Workspace[]> {
    try {
      const query = this.workspaceRepository
        .createQueryBuilder('workspace')
        .innerJoin(
          'workspace.reservations',
          'reservation',
          'reservation.session_id = :sessionId',
          { sessionId },
        );

      const workspace = await query.getMany();

      if (!workspace)
        throw new HttpException('Invalid query', HttpStatus.BAD_REQUEST);

      if (workspace.length == 0)
        throw new HttpException('This list is empty', 200);

      return workspace;
    } catch (err) {
      throw new HttpException(
        `ERROR. ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
