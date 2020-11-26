/* istanbul ignore file */
import { EQuestionType } from '@sociometrics/constants/sociometric.constant';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';
import { QuestionBank } from './quetion-bank.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 256, name: 'quetion_q' })
  questionP!: string;

  @Column('varchar', { length: 256, name: 'quetion_n', nullable: true })
  questionN!: string;

  @Column('enum', { enum: EQuestionType, enumName: 'question_type_enum' })
  type!: EQuestionType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @ManyToOne(
    () => QuestionBank,
    quetionBank => quetionBank.questions,
    { nullable: false },
  )
  @JoinColumn({ name: 'question_bank_id' })
  questionBank!: QuestionBank;

  @OneToMany(
    () => Answer,
    answer => answer.question,
  )
  answers!: Answer[];
}
