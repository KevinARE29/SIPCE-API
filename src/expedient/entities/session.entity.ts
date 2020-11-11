import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EnumSessionType, EnumServiceType } from '@expedient/constants/session.constants';
import { Evaluation } from '@expedient/entities/evaluation.entity';
import { User } from '@users/entities/users.entity';
import { Expedient } from '@expedient/entities/expedient.entity';
import { InterventionProgram } from '@expedient/entities/intervention-program.entity';
import { SessionResponsibleAssistence } from '@expedient/entities/session-responsible-assistence.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('enum', { name: 'session_type', enum: EnumSessionType, enumName: 'session_enum' })
  sessionType!: EnumSessionType;

  @Column('enum', { name: 'service_type', enum: EnumServiceType, enumName: 'service_enum' })
  serviceType!: EnumServiceType;

  @Column({ name: 'started_at', nullable: false, type: 'timestamptz' })
  startedAt!: Date;

  @Column('decimal')
  duration!: number;

  @Column('varchar')
  comments!: string;

  @Column('varchar', { name: 'treated_topics' })
  treatedTopics!: string;

  @Column('varchar')
  agreements!: string;

  @Column('boolean')
  draft!: boolean;

  @OneToMany(
    () => Evaluation,
    evaluation => evaluation.session,
    { nullable: true },
  )
  evaluations!: Evaluation[];

  @ManyToOne(
    () => Expedient,
    expedient => expedient.sessions,
    { nullable: false },
  )
  @JoinColumn({ name: 'expedient_id' })
  expedient!: Expedient;

  @ManyToOne(
    () => InterventionProgram,
    interventionProgram => interventionProgram.sessions,
    { nullable: true },
  )
  @JoinColumn({ name: 'intervention_program_id' })
  interventionProgram!: InterventionProgram;

  @OneToOne(
    () => SessionResponsibleAssistence,
    sessionResponsibleAssistence => sessionResponsibleAssistence.session,
    { nullable: true },
  )
  sessionResponsibleAssistence!: SessionResponsibleAssistence;

  @ManyToMany(
    () => User,
    user => user.sessions,
  )
  @JoinTable({
    name: 'session_user',
    joinColumns: [{ name: 'session_id' }],
    inverseJoinColumns: [{ name: 'counselor_id' }],
  })
  counselor!: User[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;
}
