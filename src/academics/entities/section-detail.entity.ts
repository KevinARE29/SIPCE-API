/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Column,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/users.entity';
import { Student } from '@students/entities/student.entity';
import { BehavioralHistory } from '@history/entities/behavioral-history.entity';
import { SociometricTest } from '@sociometrics/entities/sociometric-test.entity';
import { Section } from './section.entity';
import { GradeDetail } from './grade-detail.entity';

@Entity()
export class SectionDetail {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  closed!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(
    () => Section,
    section => section.sectionDetails,
    { nullable: false, eager: true },
  )
  @JoinColumn({ name: 'section_id' })
  section!: Section;

  @ManyToOne(
    () => GradeDetail,
    gradeDetail => gradeDetail.sectionDetails,
    { nullable: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'grade_detail_id' })
  gradeDetail!: GradeDetail;

  @ManyToOne(
    () => User,
    user => user.sectionDetails,
    { nullable: true, eager: true },
  )
  @JoinColumn({ name: 'teacher_id' })
  teacher!: User;

  @ManyToMany(
    () => Student,
    student => student.sectionDetails,
  )
  students!: Student[];

  @ManyToMany(
    () => User,
    user => user.auxSectionDetails,
  )
  auxTeachers!: User[];

  @OneToMany(
    () => BehavioralHistory,
    behavioralHistory => behavioralHistory.sectionDetailId,
  )
  behavioralHistorys!: BehavioralHistory[];

  @OneToMany(
    () => SociometricTest,
    sociometricTest => sociometricTest.sectionDetail,
  )
  sociometricTests!: SociometricTest[];
}
