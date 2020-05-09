/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';

@Entity()
export class Token {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { name: 'access_token', length: 512 })
  accessToken!: string;

  @Column('varchar', { name: 'refresh_token', length: 512 })
  refreshToken!: string;

  @Column({ name: 'exp' })
  exp!: Date;

  @ManyToOne(
    () => User,
    user => user.tokens,
  )
  user!: User;
}
