import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '@users/entities/users.entity';
import { EnumEventType } from '@schedules/constants/schedule.constants';
import { Student } from '@students/entities/student.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('enum', { name: 'event_type', enum: EnumEventType, enumName: 'schedule_enum', default: 1 })
  eventType!: EnumEventType;

  @Column({ name: 'json_data', type: 'json' })
  jsonData!: Record<string, any>;

  @Column({ default: false })
  notification!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(
    () => User,
    user => user.schedules,
    { nullable: false },
  )
  @JoinColumn({ name: 'owner_id' })
  ownerSchedule!: User;

  @ManyToOne(
    () => Student,
    student => student.schedules,
    { nullable: true },
  )
  @JoinColumn({ name: 'student_id' })
  studentSchedule?: Student;

  @ManyToMany(
    () => User,
    user => user.scheduleEmployees,
    { onDelete: 'CASCADE' },
  )
  @JoinTable({
    name: 'schedule_employee',
    joinColumns: [{ name: 'schedule_id' }],
    inverseJoinColumns: [{ name: 'employee_id' }],
  })
  employeesSchedule?: User[];
}
