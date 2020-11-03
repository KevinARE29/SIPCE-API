import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Sanction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 128, unique: true })
  name!: string;

  @Column('varchar', { length: 256 })
  description!: string;

  @Column('varchar', { length: 8, unique: true })
  numeral!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;
}
