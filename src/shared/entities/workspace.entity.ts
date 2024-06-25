import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Room } from './room.entity';

@Entity({ schema: 'coworking', name: 'workspace' })
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: number;

  @Column()
  column: number;

  @ManyToOne(() => Room, (room) => room.workspaces)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @OneToMany(() => Reservation, (reservation) => reservation.workspace)
  reservations: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
  session: any;
}
