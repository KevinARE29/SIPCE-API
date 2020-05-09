/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 63 })
  name!: string;

  @ManyToMany(
    () => Permission,
    permission => permission.roles,
  )
  @JoinTable()
  permissions!: Permission[];
}
