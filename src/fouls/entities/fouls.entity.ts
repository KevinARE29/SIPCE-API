import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EnumFoulsType } from '@fouls/constants/fouls.constants';

@Entity()
export class Fouls {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('enum', { name: 'fouls_type', enum: EnumFoulsType, enumName: 'fouls_enum' })
  foulsType!: EnumFoulsType;

  @Column('varchar', { length: 256 })
  description!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;
}
