import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../../shared/dtos/reservations/create-reservation.dto';
import { UpdateReservationDto } from '../../shared/dtos/reservations/update-reservation.dto';

@Injectable()
export class ReservationsService {
  create(createReservationDto: CreateReservationDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
