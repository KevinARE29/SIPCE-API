import { Student } from '@students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { SociometricTest } from './sociometric-test.entity';

@Entity()
@Unique(['sociometricTest', 'student'])
export class SociometricTestDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  finished!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToOne(
    () => SociometricTest,
    sociometricTest => sociometricTest.sociometricTestDetails,
    { nullable: false },
  )
  @JoinColumn({ name: 'sociometric_test_id' })
  sociometricTest!: SociometricTest;

  @ManyToOne(
    () => Student,
    student => student.sociometricTestDetails,
    { nullable: false },
  )
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @OneToMany(
    () => Answer,
    answer => answer.sociometricTestDetail,
  )
  answers!: Answer[];
}
