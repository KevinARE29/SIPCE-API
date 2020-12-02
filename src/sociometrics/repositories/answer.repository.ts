import { Answer } from '@sociometrics/entities/answer.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  getAnswers(sociometricTestId: number, questionId: number): Promise<Answer[]> {
    return this.createQueryBuilder('answer')
      .leftJoin('answer.question', 'question')
      .leftJoinAndSelect('answer.sociometricTestDetail', 'sociometricTestDetail')
      .leftJoinAndSelect('answer.student', 'selectedStudent')
      .leftJoin('sociometricTestDetail.sociometricTest', 'sociometricTest')
      .leftJoinAndSelect('sociometricTestDetail.student', 'student')
      .andWhere(`question.id = ${questionId}`)
      .andWhere(`sociometricTest.id = ${sociometricTestId}`)
      .orderBy('student.lastname', 'ASC')
      .orderBy('student.firstname', 'ASC')
      .getMany();
  }
}
