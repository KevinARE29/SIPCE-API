/* istanbul ignore file */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Token } from '@auth/entities/token.entity';
import { Permission } from '@auth/entities/permission.entity';
import { Role } from '@auth/entities/role.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 64, unique: true })
  username!: string;

  @Column('varchar', { length: 128 })
  name!: string;

  @Column('varchar', { length: 128 })
  password!: string;

  @Column('varchar', { length: 128, unique: true })
  email!: string;

  @Column('varchar', { length: 256, nullable: true })
  image!: string;

  @Column('varchar', { name: 'reset_password_token', length: 512, unique: true, nullable: true })
  resetPasswordToken!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @OneToMany(
    () => Token,
    token => token.user,
  )
  tokens!: Token[];

  @ManyToMany(
    () => Permission,
    permission => permission.users,
  )
  @JoinTable({
    name: 'user_permission',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions!: Permission[];

  @ManyToMany(
    () => Role,
    role => role.users,
  )
  @JoinTable({
    name: 'user_role',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles!: Role[];
}
