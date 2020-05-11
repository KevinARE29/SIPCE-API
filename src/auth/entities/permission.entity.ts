/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';
import { User } from 'src/users/entities/users.entity';

@Entity()
export class Permission {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 128 })
  name!: string;

  @Column('varchar', { length: 64 })
  codename!: string;

  @ManyToMany(
    () => Role,
    role => role.permissions,
  )
  roles!: Role[];

  @ManyToMany(
    () => Permission,
    permission => permission.users,
  )
  users!: User[];
}
