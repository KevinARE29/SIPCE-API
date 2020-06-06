/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ActionLog {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { name: 'username', length: 64 })
  username!: string;

  @Column('varchar', { name: 'ip', length: 16, nullable: true })
  ip!: string;

  @Column('smallint', { name: 'status_code' })
  statusCode!: number;

  @Column({ name: 'attempt_time', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  attemptTime!: Date;
}
