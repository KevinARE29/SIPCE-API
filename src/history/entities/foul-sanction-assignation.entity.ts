import { Period } from '@academics/entities/period.entity';
import { Foul } from '@fouls/entities/fouls.entity';
import { Sanction } from '@sanctions/entities/sanctions.entity';
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
export class FoulSanctionAssignation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'issue_date', nullable: true, type: 'timestamptz' })
  issueDate!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToOne(
    () => BehavioralHistory,
    behavioralHistory => behavioralHistory.foulSanctionAssignations,
  )
  @JoinColumn({ name: 'behavioral_history_id' })
  behavioralHistoryId!: BehavioralHistory;

  @ManyToOne(
    () => Period,
    period => period.foulSanctionAssignations,
  )
  @JoinColumn({ name: 'period_id' })
  periodId!: Period;

  @ManyToOne(
    () => Sanction,
    sanction => sanction.foulSanctionAssignations,
    { nullable: true },
  )
  @JoinColumn({ name: 'sanction_id' })
  sanctionId?: Sanction;

  @ManyToOne(
    () => Foul,
    foul => foul.foulSanctionAssignations,
  )
  @JoinColumn({ name: 'foul_id' })
  foulId!: Foul;
}
