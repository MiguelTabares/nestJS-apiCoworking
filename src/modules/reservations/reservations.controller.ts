import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from '../../shared/dtos/index-dtos';
import { Reservation } from '../../shared/entities/index-entities';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.reservationService.remove(id);
  }
}
