import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from '../../shared/entities/user.entity';
import { Reservation } from '../../shared/entities/reservation.entity';
import { Workspace } from '../../shared/entities/workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reservation, Workspace])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
