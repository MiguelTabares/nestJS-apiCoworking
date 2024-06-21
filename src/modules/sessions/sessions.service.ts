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
    return await this.sessionRepository.find({ relations: ['reservations'] });
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });
    if (!session) {
      throw new NotFoundException(`Session's ID ${id} not found`);
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
}