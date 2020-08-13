/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/users.entity';
import { CycleDetail } from './cycle-detail.entity';
import { Grade } from './grade.entity';
import { SectionDetail } from './section-detail.entity';

@Entity()
export class GradeDetail {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(
    () => Grade,
    grade => grade.gradeDetails,
    { nullable: false, eager: true },
  )
  @JoinColumn({ name: 'grade_id' })
  grade!: Grade;

  @ManyToOne(
    () => CycleDetail,
    cycleDetail => cycleDetail.gradeDetails,
    { nullable: false },
  )
  @JoinColumn({ name: 'cycle_detail_id' })
  cycleDetail!: CycleDetail;

  @ManyToOne(
    () => User,
    user => user.gradeDetails,
    { nullable: true, eager: true },
  )
  @JoinColumn({ name: 'counselor_id' })
  counselor!: User;

  @OneToMany(
    () => SectionDetail,
    sectionDetail => sectionDetail.gradeDetail,
    { eager: true },
  )
  sectionDetails!: SectionDetail[];
}
