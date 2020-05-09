/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

@Entity()
export class Permission {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 127 })
  name!: string;

  @Column('varchar', { length: 63 })
  codeName!: string;

  @ManyToMany(
    () => Role,
    role => role.permissions,
  )
  roles!: Role[];
}
