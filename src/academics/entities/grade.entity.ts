/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@students/entities/student.entity';
import { Image } from '@students/entities/image.entity';
import { GradeDetail } from './grade-detail.entity';

@Entity()
export class Grade {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32, unique: true })
  name!: string;

  @Column({ default: false })
  active!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(
    () => GradeDetail,
    gradeDetail => gradeDetail.grade,
  )
  gradeDetails!: GradeDetail[];

  @OneToMany(
    () => Student,
    student => student.startedGrade,
  )
  startedStudents!: Student[];

  @OneToMany(
    () => Student,
    student => student.currentGrade,
  )
  currentStudents!: Student[];

  @OneToMany(
    () => Image,
    image => image.grade,
  )
  images!: Image[];
}
