import { SectionDetail } from '@academics/entities/section-detail.entity';
import { ESociometricTestStatus } from '@sociometrics/constants/sociometric.constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionBank } from './quetion-bank.entity';
import { SociometricTestDetail } from './sociometric-test-detail.entity';

@Entity()
export class SociometricTest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('enum', { enum: ESociometricTestStatus, enumName: 'sociometric_test_status_enum' })
  status!: ESociometricTestStatus;

  @Column('smallint', { name: 'answers_per_question' })
  answersPerQuestion!: number;

  @Column({ default: false })
  completed!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToOne(
    () => QuestionBank,
    questionBank => questionBank.sociometricTests,
    { nullable: false },
  )
  @JoinColumn({ name: 'question_bank_id' })
  questionBank!: QuestionBank;

  @ManyToOne(
    () => SectionDetail,
    sectionDetail => sectionDetail.sociometricTests,
    { nullable: false },
  )
  @JoinColumn({ name: 'section_detail_id' })
  sectionDetail!: SectionDetail;

  @OneToMany(
    () => SociometricTestDetail,
    sociometricTestDetail => sociometricTestDetail.sociometricTest,
  )
  sociometricTestDetails!: SociometricTestDetail[];
}
