/* istanbul ignore file */
import { ERequestStatus } from '@counseling/constants/request.constant';
import { Student } from '@students/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 128 })
  subject!: string;

  @Column('varchar', { length: 512, nullable: true })
  comment?: string;

  @Column('enum', { enum: ERequestStatus, enumName: 'request_status_enum', default: 1 })
  status!: ERequestStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(
    () => Student,
    student => student.requests,
    { nullable: false },
  )
  @JoinColumn({ name: 'student_id' })
  student!: Student;
}
