import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Reservation } from '../../shared/entities/index-entities';
import { CreateReservationDto } from '../../shared/dtos/index-dtos';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create(createReservationDto);
    return await this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    const queryBuilder =
      this.reservationRepository.createQueryBuilder('reservation');
    this.addRelationsToQueryBuilder(queryBuilder);
    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Reservation> {
    const queryBuilder =
      this.reservationRepository.createQueryBuilder('reservation');
    this.addRelationsToQueryBuilder(queryBuilder);
    queryBuilder.where('reservation.id = :id', { id });
    const reservation = await queryBuilder.getOne();
    if (!reservation) {
      throw new NotFoundException(`Reservation's ID ${id} not found`);
    }
    return reservation;
  }

  async update(
    id: number,
    updateReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.reservationRepository.preload({
      id,
      ...updateReservationDto,
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation's ID ${id} not found`);
    }
    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation's ID ${id} not found`);
    }
    await this.reservationRepository.softRemove(reservation);
  }

  private addRelationsToQueryBuilder(
    queryBuilder: SelectQueryBuilder<Reservation>,
  ): void {
    queryBuilder
      .leftJoinAndSelect('reservation.workspace', 'workspace')
      .leftJoinAndSelect('reservation.session', 'session')
      .leftJoinAndSelect('reservation.user', 'user');
  }
}
