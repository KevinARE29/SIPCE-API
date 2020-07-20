/* istanbul ignore file */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/users.entity';
import { ESchedule } from '@schedules/constants/constants/schedule.constant';
@Entity()
export class Schedule {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('enum', { enum: ESchedule, enumName: 'day_enum' })
  day!: ESchedule;

  @Column({ name: 'start_time', type: 'timetz' })
  startTime!: Date;

  @Column({ name: 'end_time', type: 'timetz' })
  endTime!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(
    () => User,
    user => user.schedules,
    { nullable: true },
  )
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
