import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BehavioralHistoryRepository } from '@history/repository/behavioral-history.repository';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { AddFinalCommentDto } from '@history/dtos/add-behavioral-history-final-comment.dto';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import { BehavioralHistoryResponse } from '@history/docs/behavioral-history-response.doc';
import { plainToClass } from 'class-transformer';
import { BehavioralHistory } from '@history/docs/behavioral-history.doc';
import { StudentRepository } from '@students/repositories';
import { PageDto } from '@core/dtos/page.dto';
import { getStudentBehavioralHistoriesCounters } from '@history/utils/behavioral-history.util';
import { StudentsBehabioralHistory } from '@history/docs/students-behavioral-history.doc';
import { StudentsBehavioralHistoryResponse } from '@history/docs/students-behavioral-history-response.doc';
import { getPagination } from '@core/utils/pagination.util';
import { StudentsBehavioralHistoryFilterDto } from '@history/dtos/students-behavioral-history-filter.dto';
import { UsersService } from '@users/services';

@Injectable()
export class BehavioralHistoryService {
  constructor(
    private readonly behavioralHistoryRepository: BehavioralHistoryRepository,
    private readonly studentRepository: StudentRepository,
    private readonly userService: UsersService,
  ) {}

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

  async getStudentsBehavioralHistories(
    userId: number,
    pageDto: PageDto,
    studentsBehavioralHistoryFilterDto: StudentsBehavioralHistoryFilterDto,
  ): Promise<StudentsBehavioralHistoryResponse> {
    const {
      data: { roles },
    } = await this.userService.getSingleUser(userId);
    const administrative =
      roles.map(role => role.name).includes('Director') ||
      roles.map(role => role.name).includes('Coordinador de Ciclo');
    const [students, count] = await this.studentRepository.getStudentsBehavioralHistoryByCounselorId(
      userId,
      pageDto,
      studentsBehavioralHistoryFilterDto,
      administrative,
    );
    const studentsToReturn = students.map(student => ({
      ...student,
      ...getStudentBehavioralHistoriesCounters(student.behavioralHistorys),
      currentSection: student.sectionDetails[0].section,
    }));
    const pagination = getPagination(pageDto, count);
    return {
      data: plainToClass(StudentsBehabioralHistory, studentsToReturn, { excludeExtraneousValues: true }),
      pagination,
    };
  }
}
