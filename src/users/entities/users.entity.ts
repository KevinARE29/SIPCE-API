/* istanbul ignore file */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Token } from '@auth/entities/token.entity';
import { Permission } from '@auth/entities/permission.entity';
import { Role } from '@auth/entities/role.entity';
import { ActionLog } from '@logs/entities/action-log.entity';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { SectionDetail } from '@academics/entities/section-detail.entity';
import { Schedule } from '@schedules/entities/schedules.entity';
import { InterventionProgram } from '@expedient/entities/intervention-program.entity';
import { Session } from '@expedient/entities/session.entity';
import { QuestionBank } from '@sociometrics/entities/quetion-bank.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32, unique: true })
  username!: string;

  @Column('varchar', { length: 32, unique: true })
  code!: string;

  @Column('varchar', { length: 64 })
  firstname!: string;

  @Column('varchar', { length: 64 })
  lastname!: string;

  @Column('varchar', { length: 60, nullable: true })
  password!: string;

  @Column('varchar', { length: 128, unique: true })
  email!: string;

  @Column('varchar', { name: 'reset_password_token', length: 512, unique: true, nullable: true })
  resetPasswordToken!: string | null;

  @Column({ default: false })
  active!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @OneToMany(
    () => Token,
    token => token.user,
  )
  tokens!: Token[];

  @OneToMany(
    () => ActionLog,
    actionLog => actionLog.user,
  )
  actionLogs!: ActionLog[];

  @ManyToMany(
    () => Permission,
    permission => permission.users,
  )
  @JoinTable({
    name: 'user_permission',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions!: Permission[];

  @ManyToMany(
    () => Role,
    role => role.users,
  )
  @JoinTable({
    name: 'user_role',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles!: Role[];

  @OneToMany(
    () => CycleDetail,
    cycleDetail => cycleDetail.cycleCoordinator,
  )
  cycleDetails!: CycleDetail[];

  @OneToMany(
    () => GradeDetail,
    gradeDetail => gradeDetail.counselor,
  )
  gradeDetails!: GradeDetail[];

  @OneToMany(
    () => SectionDetail,
    sectionDetail => sectionDetail.teacher,
  )
  sectionDetails!: SectionDetail[];

  @ManyToMany(
    () => SectionDetail,
    auxSectionDetail => auxSectionDetail.auxTeachers,
  )
  @JoinTable({
    name: 'aux_teacher_section_detail',
    joinColumns: [{ name: 'aux_teacher_id' }],
    inverseJoinColumns: [{ name: 'section_detail_id' }],
  })
  auxSectionDetails!: SectionDetail[];

  @OneToMany(
    () => Schedule,
    schedule => schedule.ownerSchedule,
  )
  schedules!: Schedule[];

  @ManyToMany(
    () => Schedule,
    schedule => schedule.employeesSchedule,
  )
  scheduleEmployees!: Schedule[];

  @OneToMany(
    () => InterventionProgram,
    interventionProgram => interventionProgram.counselor,
  )
  interventionPrograms!: InterventionProgram[];

  @ManyToMany(
    () => Session,
    session => session.counselor,
  )
  sessions!: Session[];

  @OneToMany(
    () => QuestionBank,
    questionBank => questionBank.counselor,
  )
  questionBanks!: QuestionBank[];
}
