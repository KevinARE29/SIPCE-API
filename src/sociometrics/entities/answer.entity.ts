import { Student } from '@students/entities/student.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './quetion.entity';
import { SociometricTestDetail } from './sociometric-test-detail.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('smallint')
  ponderation!: number;

  @ManyToOne(
    () => SociometricTestDetail,
    sociometricTestDetail => sociometricTestDetail.answers,
    { nullable: false },
  )
  @JoinColumn({ name: 'sociometric_test_detail_id' })
  sociometricTestDetail!: SociometricTestDetail;

  @ManyToOne(
    () => Question,
    question => question.answers,
    { nullable: false },
  )
  @JoinColumn({ name: 'question_id' })
  question!: Question;

  @ManyToOne(
    () => Student,
    student => student.answers,
    { nullable: false },
  )
  @JoinColumn({ name: 'student_id' })
  student!: Student;
}
