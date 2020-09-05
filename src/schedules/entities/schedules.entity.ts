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
import { Transform } from 'class-transformer';
import { EnumEventType } from '@schedules/constants/schedule.costants';
import { Student } from '@students/entities/student.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Transform(day => day.format('DD/MM/YY'))
  @Column()
  day!: Date;

  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime!: Date;

  @Column({ name: 'end_time', type: 'timestamptz' })
  endTime!: Date;

  @Column('varchar', { length: 128 })
  description!: string;

  @Column('varchar', { length: 128 })
  subject!: string;

  @Column()
  recurrent!: boolean;

  @Column('enum', { name: 'event_type', enum: EnumEventType, enumName: 'schedule_enum', default: 1 })
  eventType!: EnumEventType;

  @Column({ name: 'json_data', type: 'json' })
  jsonData!: Record<string, any>;

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
    name: 'schedule_employees',
    joinColumns: [{ name: 'schedule_event' }],
    inverseJoinColumns: [{ name: 'employees_id' }],
  })
  employeesSchedule?: User[];
}
