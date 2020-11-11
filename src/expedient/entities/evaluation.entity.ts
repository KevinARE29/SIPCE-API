import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Session } from '@expedient/entities/session.entity';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  description!: string;

  @ManyToOne(
    () => Session,
    session => session.evaluations,
    { nullable: false },
  )
  @JoinColumn({ name: 'session_id' })
  session!: Session;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;
}
