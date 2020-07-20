/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import { CycleDetail } from './cycle-detail.entity';

@Entity()
export class SchoolYear {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('smallint', { unsigned: true, unique: true })
  year!: number;

  @Column('enum', { enum: ESchoolYearStatus, enumName: 'school_year_status_enum', default: 1 })
  status!: ESchoolYearStatus;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate!: Date;

  @Column({ name: 'end_date', type: 'timestamptz' })
  endDate!: Date;

  @Column({ name: 'close_date', nullable: true, type: 'timestamptz' })
  closeDate!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(
    () => CycleDetail,
    cycleDetail => cycleDetail.schoolYear,
  )
  cycleDetails!: CycleDetail[];
}
