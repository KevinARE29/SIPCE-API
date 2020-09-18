/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@students/entities/student.entity';
import { CycleDetail } from './cycle-detail.entity';

@Entity()
export class Shift {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 16, unique: true })
  name!: string;

  @Column({ default: false })
  active!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(
    () => CycleDetail,
    cycleDetail => cycleDetail.shift,
  )
  cycleDetails!: CycleDetail[];

  @OneToMany(
    () => Student,
    student => student.currentShift,
  )
  currentStudents!: Student[];
}
