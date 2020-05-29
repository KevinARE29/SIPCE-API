/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/users.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 64 })
  name!: string;

  @ManyToMany(
    () => Permission,
    permission => permission.roles,
  )
  @JoinTable({
    name: 'role_permission',
    joinColumns: [{ name: 'rol_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions!: Permission[];

  @ManyToMany(
    () => User,
    user => user.roles,
  )
  users!: User[];
}
