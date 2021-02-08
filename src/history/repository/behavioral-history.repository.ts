import { EntityRepository, Repository } from 'typeorm';
import { BehavioralHistory } from '@history/entities/behavioral-history.entity';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { NotFoundException } from '@nestjs/common';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
@EntityRepository(BehavioralHistory)
export class BehavioralHistoryRepository extends Repository<BehavioralHistory> {
  async findBehavioralHistoryOrFail(studentHistoryIdsDto: StudentHistoryIdsDto): Promise<BehavioralHistory> {
    const { historyId, studentId } = studentHistoryIdsDto;
    const query = this.createQueryBuilder('behavioral_history')
      .leftJoinAndSelect('behavioral_history.studentId', 'studentId')
      .leftJoinAndSelect('behavioral_history.sectionDetailId', 'sectionDetailId')
      .leftJoinAndSelect('sectionDetailId.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('sectionDetailId.teacher', 'teacher')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.schoolYear', 'schoolYear')
      .andWhere(`studentId.id = ${studentId}`)
      .andWhere(`behavioral_history.id = ${historyId}`)
      .andWhere('behavioral_history.deletedAt is null');
    const behavioralHistory = await query.getOne();
    if (!behavioralHistory) {
      throw new NotFoundException('El historial académico y conductual no fue encontrado');
    }
    return behavioralHistory;
  }

  async findBehavioralHistoriesBySectionDetailId(sectionDetailId: number): Promise<BehavioralHistory[]> {
    const query = this.createQueryBuilder('behavioral_history')
      .leftJoinAndSelect('behavioral_history.sectionDetailId', 'sectionDetailId')
      .andWhere(`sectionDetailId.id = ${sectionDetailId}`)
      .andWhere('behavioral_history.deletedAt is null');

    return query.getMany();
  }

  async getActiveBehavioralHistories(studentIds: number[]): Promise<BehavioralHistory[]> {
    return this.createQueryBuilder('behavioralHistory')
      .leftJoinAndSelect('behavioralHistory.studentId', 'student')
      .leftJoinAndSelect('student.sectionDetails', 'sectionDetail')
      .leftJoinAndSelect('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.schoolYear', 'schoolYear')
      .andWhere(`schoolYear.status = '${ESchoolYearStatus['En curso']}'`)
      .andWhere('student.id IN (:...studentIds)', { studentIds: [null, ...studentIds] })
      .andWhere('behavioralHistory.finalConclusion is null')
      .getMany();
  }
}
