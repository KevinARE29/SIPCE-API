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
import { Token } from 'src/auth/entities/token.entity';
import { Permission } from 'src/auth/entities/permission.entity';
import { Role } from 'src/auth/entities/role.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32, unique: true })
  username!: string;

  @Column('varchar', { length: 128 })
  name!: string;

  @Column('varchar', { length: 128 })
  password!: string;

  @Column('varchar', { length: 128, unique: true })
  email!: string;

  @Column('varchar', { length: 256, nullable: true })
  image!: string;

  @Column('varchar', { length: 512, unique: true, nullable: true })
  resetPasswordToken!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
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
  @JoinTable()
  permissions!: Permission[];

  @ManyToMany(
    () => Role,
    role => role.users,
  )
  @JoinTable()
  roles!: Role[];
}
