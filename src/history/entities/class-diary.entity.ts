import { User } from '@users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BehavioralHistory } from './behavioral-history.entity';

@Entity()
export class ClassDiary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 512 })
  description!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToOne(
    () => BehavioralHistory,
    behavioralHistory => behavioralHistory.classDiarys,
  )
  @JoinColumn({ name: 'behavioral_history_id' })
  behavioralHistoryId!: BehavioralHistory;

  @ManyToOne(
    () => User,
    user => user.classDiarys,
  )
  @JoinColumn({ name: 'reporter_id' })
  reporterId!: User;
}
