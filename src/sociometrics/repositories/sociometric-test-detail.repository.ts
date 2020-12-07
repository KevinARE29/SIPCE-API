import { EntityRepository, getConnection, Repository } from 'typeorm';
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
      await this.save({ student: { id: studentId }, sociometricTest: { id: sociometricTestId } });
      return this.findOrCreate(sociometricTestId, studentId);
    }
    return sociometricTestDetail;
  }

  getStudentEvolution(studentId: number): Promise<SociometricTestDetail[]> {
    return getConnection().query(`
    select sy.year,q.type,
    count(case when a.ponderation > 0 then 1 end) as possitive,
    count(case when a.ponderation < 0 then 1 end) as negative
    from school_year sy
    left join cycle_detail cd on sy.id = cd.school_year_id
    left join grade_detail gd on cd.id = gd.cycle_detail_id
    left join section_detail sd on gd.id = sd.grade_detail_id
    left join sociometric_test st on sd.id = st.section_detail_id
    left join sociometric_test_detail std on st.id = std.sociometric_test_id
    left join answer a on std.id = a.sociometric_test_detail_id
    left join question q on a.question_id = q.id
    left join student sst on a.student_id = sst.id
    where a.id is not null
    and sd.id is not null
    and sst.id = ${studentId}
    group by sy.year, q.type;
    `);
  }
}
