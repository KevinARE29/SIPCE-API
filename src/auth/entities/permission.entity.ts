/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/users.entity';
import { Role } from './role.entity';

@Entity()
export class Permission {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 128, unique: true })
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
