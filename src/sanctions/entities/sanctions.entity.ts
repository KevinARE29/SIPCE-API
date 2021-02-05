import { FoulSanctionAssignation } from '@history/entities/foul-sanction-assignation.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Sanction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 128 })
  name!: string;

  @Column('varchar', { length: 256 })
  description!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @OneToMany(
    () => FoulSanctionAssignation,
    foulSanctionAssignation => foulSanctionAssignation.sanctionId,
  )
  foulSanctionAssignations!: FoulSanctionAssignation[];
}
