/* istanbul ignore file */
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
import { EStudentStatus } from '@students/constants/student.constant';
import { SectionDetail } from '@academics/entities/section-detail.entity';
import { Grade } from '@academics/entities/grade.entity';
import { ResponsibleStudent } from './responsible_student.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32 })
  code!: string;

  @Column('varchar', { length: 128 })
  firstname!: string;

  @Column('varchar', { length: 128 })
  lastname!: string;

  @Column({ type: 'timestamptz' })
  birthdate!: Date;

  @Column('smallint', { name: 'registration_year', unsigned: true })
  registrationYear!: number;

  @Column('varchar', { length: 128, unique: true })
  email!: string;

  @Column('enum', { enum: EStudentStatus, enumName: 'student_status_enum' })
  status!: EStudentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToMany(() => Student)
  @JoinTable({
    name: 'student_brother',
    joinColumns: [{ name: 'student_id' }],
    inverseJoinColumns: [{ name: 'brother_id' }],
  })
  brothers!: Student[];

  @OneToMany(
    () => ResponsibleStudent,
    responsibleStudent => responsibleStudent.student,
  )
  responsibleStudents!: ResponsibleStudent[];

  @ManyToMany(
    () => SectionDetail,
    sectionDetail => sectionDetail.students,
  )
  @JoinTable({
    name: 'student_section_detail',
    joinColumns: [{ name: 'student_id' }],
    inverseJoinColumns: [{ name: 'section_detail_id' }],
  })
  sectionDetails!: SectionDetail[];

  @ManyToOne(
    () => Grade,
    grade => grade.startedStudents,
    { nullable: false },
  )
  @JoinColumn({ name: 'started_grade_id' })
  startedGrade!: Grade;

  @ManyToOne(
    () => Grade,
    grade => grade.currentStudents,
    { nullable: false },
  )
  @JoinColumn({ name: 'current_grade_id' })
  currentGrade!: Grade;
}
