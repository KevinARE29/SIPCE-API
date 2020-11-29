/* eslint-disable prefer-destructuring */
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
  AfterLoad,
} from 'typeorm';
import { EStudentStatus } from '@students/constants/student.constant';
import { SectionDetail } from '@academics/entities/section-detail.entity';
import { Grade } from '@academics/entities/grade.entity';
import { Shift } from '@academics/entities/shift.entity';
import { Schedule } from '@schedules/entities/schedules.entity';
import { Request } from '@counseling/entities/request.entity';
import { Expedient } from '@expedient/entities/expedient.entity';
import { BehavioralHistory } from '@history/entities/behavioral-history.entity';
import { SociometricTestDetail } from '@sociometrics/entities/sociometric-test-detail.entity';
import { Answer } from '@sociometrics/entities/answer.entity';
import { ResponsibleStudent } from './responsible-student.entity';
import { Image } from './image.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 8, unique: true })
  code!: string;

  @Column('varchar', { length: 64 })
  firstname!: string;

  @Column('varchar', { length: 64 })
  lastname!: string;

  @Column({ type: 'timestamptz' })
  birthdate!: Date;

  @Column('smallint', { name: 'registration_year', unsigned: true })
  registrationYear!: number;

  @Column('varchar', { length: 128, unique: true })
  email!: string;

  @Column('enum', { enum: EStudentStatus, enumName: 'student_status_enum', default: 2 })
  status!: EStudentStatus;

  @Column('varchar', { name: 'confirmation_token', length: 512, unique: true, nullable: true })
  confirmationToken!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToMany(() => Student)
  @JoinTable({
    name: 'student_brother',
    joinColumns: [{ name: 'student_id' }],
    inverseJoinColumns: [{ name: 'brother_id' }],
  })
  siblings!: Student[];

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

  @ManyToOne(
    () => Shift,
    shift => shift.currentStudents,
    { nullable: false },
  )
  @JoinColumn({ name: 'current_shift_id' })
  currentShift!: Shift;

  @OneToMany(
    () => Image,
    image => image.student,
  )
  images!: Image[];

  @OneToMany(
    () => Schedule,
    schedule => schedule.studentSchedule,
  )
  schedules!: Schedule[];

  @OneToMany(
    () => Request,
    request => request.student,
  )
  requests!: Request[];

  currentPhoto!: Image;

  @OneToMany(
    () => Expedient,
    expedient => expedient.student,
  )
  expedients!: Expedient[];

  @OneToMany(
    () => BehavioralHistory,
    behavioralHistory => behavioralHistory.studentId,
  )
  behavioralHistorys!: BehavioralHistory[];

  @OneToMany(
    () => SociometricTestDetail,
    sociometricTestDetail => sociometricTestDetail.student,
  )
  sociometricTestDetails!: SociometricTestDetail[];

  @OneToMany(
    () => Answer,
    answer => answer.student,
  )
  answers!: Answer[];

  @AfterLoad()
  getLastImage() {
    if (this.images?.length && this.images[0].grade) {
      const orderedImages = this.images.sort((a, b) => {
        return a.grade.id - b.grade.id;
      });
      this.currentPhoto = orderedImages.slice(-1)[0];
    }
  }
}
