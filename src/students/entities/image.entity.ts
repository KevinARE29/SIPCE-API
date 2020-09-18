/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Grade } from '@academics/entities/grade.entity';
import { Student } from './student.entity';

@Unique(['student', 'grade'])
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 128 })
  path!: string;

  @ManyToOne(
    () => Student,
    student => student.images,
    { nullable: false },
  )
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ManyToOne(
    () => Grade,
    grade => grade.images,
    { nullable: false },
  )
  @JoinColumn({ name: 'grade_id' })
  grade!: Grade;
}
