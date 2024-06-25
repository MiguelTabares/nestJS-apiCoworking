import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Session, Workspace, User } from './index-entities';

@Entity({ schema: 'coworking', name: 'reservation' })
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
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace[];

  @ManyToOne(() => Session, (session) => session.reservations)
  @JoinColumn({ name: 'session_id' })
  session: Session[];

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User[];
}
