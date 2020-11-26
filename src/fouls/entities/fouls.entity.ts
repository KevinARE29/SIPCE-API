import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { EnumFoulsType } from '@fouls/constants/fouls.constants';
import { FoulSanctionAssignation } from '@history/entities/foul-sanction-assignation.entity';

@Entity()
export class Foul {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('enum', { name: 'fouls_type', enum: EnumFoulsType, enumName: 'fouls_enum' })
  foulsType!: EnumFoulsType;

  @Column('varchar', { length: 256 })
  description!: string;

  @Column('varchar', { length: 16, unique: true })
  numeral!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @OneToMany(
    () => FoulSanctionAssignation,
    foulSanctionAssignation => foulSanctionAssignation.foulId,
  )
  foulSanctionAssignations!: FoulSanctionAssignation[];
}
