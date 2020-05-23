/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Token {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { name: 'access_token', length: 512 })
  accessToken!: string;

  @Column('varchar', { name: 'refresh_token', length: 512 })
  refreshToken!: string;

  @Column()
  exp!: number;

  @ManyToOne(
    () => User,
    user => user.tokens,
    { nullable: false },
  )
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
