/* istanbul ignore file */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/users.entity';
import { Cycle } from './cycle.entity';
import { Shift } from './shift.entity';
import { GradeDetail } from './grade-detail.entity';

@Entity()
export class CycleDetail {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('smallint', { unsigned: true })
  year!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(
    () => Cycle,
    cycle => cycle.cycleDetails,
    { nullable: false },
  )
  @JoinColumn({ name: 'cycle_id' })
  cycle!: Cycle;

  @ManyToOne(
    () => Shift,
    shift => shift.cycleDetails,
    { nullable: false },
  )
  @JoinColumn({ name: 'shift_id' })
  shift!: Shift;

  @ManyToOne(
    () => User,
    user => user.cycleDetails,
    { nullable: false },
  )
  @JoinColumn({ name: 'cycle_coordinator_id' })
  cycleCoordinator!: User;

  @OneToMany(
    () => GradeDetail,
    gradeDetail => gradeDetail.cycleDetail,
  )
  gradeDetails!: GradeDetail[];
}
