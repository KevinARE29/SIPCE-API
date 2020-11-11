import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EnumInterventionProgramType } from '@expedient/constants/intervention-program.constants';
import { User } from '@users/entities/users.entity';
import { Session } from '@expedient/entities/session.entity';

@Entity()
export class InterventionProgram {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('enum', { enum: EnumInterventionProgramType, enumName: 'intervention_program_enum' })
  type!: EnumInterventionProgramType;

  @Column('boolean')
  global!: boolean;

  @OneToMany(
    () => Session,
    session => session.interventionProgram,
    { nullable: true },
  )
  sessions!: Session[];

  @ManyToOne(
    () => User,
    user => user.interventionPrograms,
    { nullable: true },
  )
  @JoinColumn({ name: 'counselor_id' })
  counselor!: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;
}
