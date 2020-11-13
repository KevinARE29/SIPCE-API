/* istanbul ignore file */
import { User } from '@users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Question } from './quetion.entity';

@Entity()
export class QuestionBank {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 128 })
  name!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToOne(
    () => User,
    user => user.questionBanks,
    { nullable: false },
  )
  @JoinColumn({ name: 'counselor_id' })
  counselor!: User;

  @OneToMany(
    () => Question,
    question => question.questionBank,
  )
  questions!: Question[];
}
