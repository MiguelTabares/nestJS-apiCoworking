import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../shared/entities/index-entities';
import { CreateSessionDto } from '../../shared/dtos/index-dtos';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = this.sessionRepository.create(createSessionDto);
    return await this.sessionRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return this.sessionRepository.find();
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return session;
  }

  async update(
    id: number,
    updateSessionDto: CreateSessionDto,
  ): Promise<Session> {
    const session = await this.sessionRepository.preload({
      id,
      ...updateSessionDto,
    });
    if (!session) {
      throw new NotFoundException(`Session's ID ${id} not found`);
    }
    return await this.sessionRepository.save(session);
  }

  async remove(id: number): Promise<void> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Session's ID ${id} not found`);
    }
    await this.sessionRepository.softRemove(session);
  }

  // async getMostBookedSessions(): Promise<any> {
  //   const queryBuilder = this.sessionRepository.createQueryBuilder('session');

  //   queryBuilder
  //     .leftJoin('session.reservations', 'reservation')
  //     .addSelect('session.id', 'sessionId')
  //     .addSelect('COUNT(reservation.id)', 'reservationscount')
  //     .groupBy('session.id')
  //     .orderBy('reservationscount', 'DESC');

  //   return await queryBuilder.getRawMany();
  // }

  // async getMostAvailableSessions(): Promise<Session[]> {
  //   const queryBuilder = this.sessionRepository.createQueryBuilder('session');

  //   queryBuilder
  //     .leftJoin('session.reservations', 'reservation')
  //     .groupBy('session.id')
  //     .orderBy(
  //       'COUNT(CASE WHEN reservation.deletedAt IS NULL THEN reservation.id END)',
  //       'ASC',
  //     );

  //   return await queryBuilder.getMany();
  // }

  // private addRelationsToQueryBuilder(
  //   queryBuilder: SelectQueryBuilder<Session>,
  // ): void {
  //   queryBuilder.leftJoinAndSelect('session.reservations', 'reservation');
  //   queryBuilder.leftJoinAndSelect('session.workspaces', 'workspace');
  // }
}
