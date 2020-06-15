/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@users/entities/users.entity';
import { EActions } from '@logs/constants/log.constant';

@Entity()
export class ActionLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 128 })
  endpoint!: string;

  @Column('enum', { enum: EActions, enumName: 'action_enum' })
  action!: EActions;

  @Column('smallint', { name: 'status_code' })
  statusCode!: number;

  @Column({ name: 'attempt_time', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  attemptTime!: Date;

  @ManyToOne(
    () => User,
    user => user.actionLogs,
    { nullable: false },
  )
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
