import { SectionDetail } from '@academics/entities/section-detail.entity';
import { Student } from '@students/entities/student.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ClassDiary } from './class-diary.entity';
import { FoulSanctionAssignation } from './foul-sanction-assignation.entity';

@Entity()
export class BehavioralHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { name: 'final_conclusion', length: 512 })
  finalConclusion!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToOne(
    () => SectionDetail,
    sectionDetail => sectionDetail.behavioralHistorys,
    { nullable: true },
  )
  @JoinColumn({ name: 'section_detail_id' })
  sectionDetailId?: SectionDetail;

  @ManyToOne(
    () => Student,
    student => student.behavioralHistorys,
  )
  @JoinColumn({ name: 'student_id' })
  studentId!: Student;

  @OneToMany(
    () => ClassDiary,
    classDiary => classDiary.behavioralHistoryId,
  )
  classDiarys!: ClassDiary[];

  @OneToMany(
    () => FoulSanctionAssignation,
    foulSanctionAssignation => foulSanctionAssignation.behavioralHistoryId,
  )
  foulSanctionAssignations!: FoulSanctionAssignation[];
}
