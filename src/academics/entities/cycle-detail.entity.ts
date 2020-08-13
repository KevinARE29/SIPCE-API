/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/users.entity';
import { Cycle } from './cycle.entity';
import { Shift } from './shift.entity';
import { GradeDetail } from './grade-detail.entity';
import { SchoolYear } from './school-year.entity';

@Unique(['shift', 'cycleCoordinator'])
@Entity()
export class CycleDetail {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(
    () => Cycle,
    cycle => cycle.cycleDetails,
    { nullable: false, eager: true },
  )
  @JoinColumn({ name: 'cycle_id' })
  cycle!: Cycle;

  @ManyToOne(
    () => Shift,
    shift => shift.cycleDetails,
    { nullable: false, eager: true },
  )
  @JoinColumn({ name: 'shift_id' })
  shift!: Shift;

  @ManyToOne(
    () => SchoolYear,
    schoolYear => schoolYear.cycleDetails,
    { nullable: false },
  )
  @JoinColumn({ name: 'school_year_id' })
  schoolYear!: SchoolYear;

  @ManyToOne(
    () => User,
    user => user.cycleDetails,
    { nullable: true, eager: true },
  )
  @JoinColumn({ name: 'cycle_coordinator_id' })
  cycleCoordinator!: User;

  @OneToMany(
    () => GradeDetail,
    gradeDetail => gradeDetail.cycleDetail,
    { eager: true },
  )
  gradeDetails!: GradeDetail[];
}
