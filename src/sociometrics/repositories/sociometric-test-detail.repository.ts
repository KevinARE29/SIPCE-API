import { EntityRepository, Repository } from 'typeorm';
import { SociometricTestDetail } from '@sociometrics/entities/sociometric-test-detail.entity';

@EntityRepository(SociometricTestDetail)
export class SociometricTestDetailRepository extends Repository<SociometricTestDetail> {
  async findOrCreate(sociometricTestId: number, studentId: number): Promise<SociometricTestDetail> {
    const sociometricTestDetail = await this.createQueryBuilder('sociometricTestDetail')
      .leftJoinAndSelect('sociometricTestDetail.sociometricTest', 'sociometricTest')
      .leftJoinAndSelect('sociometricTestDetail.student', 'student')
      .leftJoinAndSelect('sociometricTestDetail.answers', 'answer')
      .leftJoinAndSelect('answer.question', 'question')
      .leftJoinAndSelect('answer.student', 'selectedStudent')
      .leftJoinAndSelect('sociometricTest.sectionDetail', 'sectionDetail')
      .leftJoinAndSelect('sociometricTest.questionBank', 'questionBank')
      .leftJoinAndSelect('questionBank.questions', 'question2')
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .leftJoinAndSelect('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .andWhere(`sociometricTest.id = ${sociometricTestId}`)
      .andWhere(`student.id = ${studentId}`)
      .getOne();

    if (!sociometricTestDetail) {
      return this.save({ student: { id: studentId }, sociometricTest: { id: sociometricTestId } });
    }
    return sociometricTestDetail;
  }
}
