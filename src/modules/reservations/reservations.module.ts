import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ReservationController } from './reservations.controller';
import { ReservationService } from './reservations.service';
import { UserService } from '../users/users.service';
import {
  Reservation,
  User,
  Session,
  Workspace,
  Room,
} from '../../shared/entities/index-entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User, Session, Workspace, Room]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, UserService],
})
export class ReservationsModule {}
