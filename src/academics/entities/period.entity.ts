/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FoulSanctionAssignation } from '@history/entities/foul-sanction-assignation.entity';

@Entity()
export class Period {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32, unique: true })
  name!: string;

  @Column({ default: false })
  active!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(
    () => FoulSanctionAssignation,
    foulSanctionAssignation => foulSanctionAssignation.periodId,
  )
  foulSanctionAssignations!: FoulSanctionAssignation[];
}
