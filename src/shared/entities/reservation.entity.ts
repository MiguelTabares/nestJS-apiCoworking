import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Session, Workspace, User } from './index-entities';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  reservationTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.reservations)
  workspace: Workspace[];

  @ManyToOne(() => Session, (session) => session.reservations)
  session: Session[];

  @ManyToOne(() => User, (user) => user.reservations)
  user: User[];
}
