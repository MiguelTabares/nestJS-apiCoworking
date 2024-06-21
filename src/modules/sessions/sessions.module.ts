import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../../shared/entities/session.entity';
import { SessionService } from './sessions.service';
import { SessionController } from './sessions.controller';
import { Reservation } from '../../shared/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Reservation])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionsModule {}
