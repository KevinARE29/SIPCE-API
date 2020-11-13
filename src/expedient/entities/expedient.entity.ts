import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExternalPsychologicalTreatment } from '@expedient/entities/external-psychological-treatment.entity';
import { Student } from '@students/entities/student.entity';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { Session } from '@expedient/entities/session.entity';

@Entity()
export class Expedient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { name: 'referrer_name' })
  referrerName!: string;

  @Column('varchar', { name: 'referrer_charge' })
  referrerCharge!: string;

  @Column('varchar')
  reason!: string;

  @Column('varchar', { name: 'problem_description' })
  problemDescription!: string;

  @Column('varchar', { name: 'diagnostic_impression' })
  diagnosticImpression!: string;

  @Column('varchar', { array: true, name: 'diagnostic_impression_categories' })
  diagnosticImpressionCategories!: string[];

  @Column('varchar', { name: 'action_plan' })
  actionPlan!: string;

  @Column('varchar', { name: 'final_conclusion', nullable: true })
  finalConclusion!: string;

  @OneToMany(
    () => Session,
    session => session.expedient,
    { nullable: true },
  )
  sessions!: Session[];

  @ManyToMany(
    () => ExternalPsychologicalTreatment,
    externalPsychologicalTreatment => externalPsychologicalTreatment.expedients,
  )
  @JoinTable({
    name: 'expedient_external_psychological_treatment',
    joinColumns: [{ name: 'expedient_id' }],
    inverseJoinColumns: [{ name: 'external_psychological_treatment_id' }],
  })
  externalPsychologicalTreatments!: ExternalPsychologicalTreatment[];

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
