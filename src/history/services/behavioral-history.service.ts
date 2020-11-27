import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BehavioralHistoryRepository } from '@history/repository/behavioral-history.repository';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { AddFinalCommentDto } from '@history/dtos/add-behavioral-history-final-comment.dto';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import { BehavioralHistoryResponse } from '@history/docs/behavioral-history-response.doc';
import { plainToClass } from 'class-transformer';
import { BehavioralHistory } from '@history/docs/behavioral-history.doc';

@Injectable()
export class BehavioralHistoryService {
  constructor(private readonly behavioralHistoryRepository: BehavioralHistoryRepository) {}

  async addFinalComment(
    teacherId: number,
    studentHistoryIdsDto: StudentHistoryIdsDto,
    addFinalCommentDto: AddFinalCommentDto,
  ): Promise<BehavioralHistoryResponse> {
    const behavioralHistory = await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(studentHistoryIdsDto);
    const schoolYearStatus = behavioralHistory.sectionDetailId?.gradeDetail.cycleDetail.schoolYear.status;
    if (schoolYearStatus === ESchoolYearStatus.Histórico) {
      throw new UnprocessableEntityException(
        'Ya no se pueden realizar modificaciones ya que el año escolar ha finalizado',
      );
    }
    if (behavioralHistory.sectionDetailId?.teacher.id !== teacherId) {
      throw new UnprocessableEntityException('No tienes los permisos para realizar esta operación ');
    }
    const behavioralHistoryToSave = {
      ...behavioralHistory,
      ...addFinalCommentDto,
    };
    const savedBehavioralHistory = await this.behavioralHistoryRepository.save(behavioralHistoryToSave);
    return { data: plainToClass(BehavioralHistory, savedBehavioralHistory, { excludeExtraneousValues: true }) };
  }
}
