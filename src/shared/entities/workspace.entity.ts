import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Session } from './session.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: number;

  @Column()
  column: number;

  @ManyToOne(() => Room, (room) => room.workspaces)
  room: Room;

  @ManyToOne(() => User, (user) => user.workspaces)
  user: User;

  @ManyToOne(() => Session, (session) => session.workspaces)
  session: Session;

  @OneToMany(() => Reservation, (reservation) => reservation.workspace)
  reservations: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
