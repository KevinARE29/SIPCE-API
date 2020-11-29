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
import { Student } from '@students/entities/student.entity';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { Session } from '@expedient/entities/session.entity';

@Entity()
export class Expedient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { name: 'referrer_name' })
  referrerName!: string;

  @Column('varchar')
  reason!: string;

  @Column('varchar', { name: 'problem_description' })
  problemDescription!: string;

  @Column('varchar', { name: 'diagnostic_impression', nullable: true })
  diagnosticImpression!: string;

  @Column('varchar', { array: true, name: 'diagnostic_impression_categories', nullable: true })
  diagnosticImpressionCategories!: string[];

  @Column('varchar', { name: 'action_plan', nullable: true })
  actionPlan!: string;

  @Column('varchar', { name: 'final_conclusion', nullable: true })
  finalConclusion!: string;

  @Column('varchar', { array: true, name: 'external_psychological_treatments', nullable: true })
  externalPsychologicalTreatments!: string[];

  @OneToMany(
    () => Session,
    session => session.expedient,
    { nullable: true },
  )
  sessions!: Session[];

  @ManyToOne(
    () => Student,
    student => student.expedients,
    { nullable: false },
  )
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ManyToOne(
    () => GradeDetail,
    gradeDetail => gradeDetail.expedients,
    { nullable: false },
  )
  @JoinColumn({ name: 'grade_detail_id' })
  gradeDetail!: GradeDetail;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;
}
