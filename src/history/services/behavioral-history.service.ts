import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { BehavioralHistoryRepository } from '@history/repository/behavioral-history.repository';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { AddFinalCommentDto } from '@history/dtos/add-behavioral-history-final-comment.dto';
import { ESchoolYearStatus, EPeriodCode, TPeriod } from '@academics/constants/academic.constants';
import { BehavioralHistoryResponse } from '@history/docs/behavioral-history-response.doc';
import { plainToClass } from 'class-transformer';
import { BehavioralHistory } from '@history/docs/behavioral-history.doc';
import { StudentRepository } from '@students/repositories';
import { PageDto } from '@core/dtos/page.dto';
import {
  getStudentBehavioralHistoriesCounters,
  syncWithStudentExpedients,
  includeFouls,
} from '@history/utils/behavioral-history.util';
import { StudentsBehabioralHistory } from '@history/docs/students-behavioral-history.doc';
import { StudentsBehavioralHistoryResponse } from '@history/docs/students-behavioral-history-response.doc';
import { getPagination } from '@core/utils/pagination.util';
import { StudentsBehavioralHistoryFilterDto } from '@history/dtos/students-behavioral-history-filter.dto';
import { UsersService } from '@users/services';
import { StudentBehavioralHistoryInformation } from '@history/docs/student-behavioral-history-information.doc';
import { StudentBehavioralHistoryInformationResponse } from '@history/docs/student-behavioral-history-information-response.doc';
import { StudentBehavioralHistoryInformationFiltersDto } from '@history/dtos/student-behavioral-history-information-filters.dto';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import { getFoulsAlertState, getFoulsCounter, getFoulsByPeriod } from '@history/utils/foul-sanction-assignation.util';
import { PdfRequestFilterDto } from '@reporting/dtos/pdf-request-filter.dto';
import { ClassDiaryRepository } from '@history/repository/class-diary.repository';
import { FoulSanctionAssignationRepository } from '@history/repository/foul-sanction-assignation.repository';
import { PeriodRepository } from '@academics/repositories';
import { StudentBehavioralHistoryInformationReport } from '@history/docs/student-behavioral-history-information-report.doc';
import { CompleteBehavioralHistoryFouls } from '@history/docs/complete-behavioral-history-fouls.doc';

@Injectable()
export class BehavioralHistoryService {
  constructor(
    private readonly behavioralHistoryRepository: BehavioralHistoryRepository,
    private readonly studentRepository: StudentRepository,
    private readonly userService: UsersService,
    private readonly classDiaryRepository: ClassDiaryRepository,
    private readonly foulSanctionAssignationRepository: FoulSanctionAssignationRepository,
    private readonly periodRepository: PeriodRepository,
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

  async getStudentBehavioralHistories(
    studentIdDto: StudentIdDto,
    userId: number,
    behavioralHistoryInformationFilterDto: StudentBehavioralHistoryInformationFiltersDto,
  ): Promise<StudentBehavioralHistoryInformationResponse> {
    const { studentId } = studentIdDto;
    const { commentsOnly } = behavioralHistoryInformationFilterDto;
    const {
      data: { roles },
    } = await this.userService.getSingleUser(userId);
    const administrative =
      roles.map(role => role.name).includes('Director') ||
      roles.map(role => role.name).includes('Coordinador de Ciclo') ||
      roles.map(role => role.name).includes('Orientador');
    const studentAcademicData = await this.studentRepository.getStudentAcademicInformation(studentId);
    const studentBehavioralHistory = studentAcademicData.behavioralHistorys;
    const dataToReturn = studentBehavioralHistory.map(behavioralHistory => ({
      ...behavioralHistory,
      authorId: behavioralHistory.sectionDetailId?.teacher.id,
      author: `${behavioralHistory.sectionDetailId?.teacher.firstname} ${behavioralHistory.sectionDetailId?.teacher.lastname}`,
      behavioralHistoryGrade: `${behavioralHistory.sectionDetailId?.gradeDetail.grade.name} (${behavioralHistory.sectionDetailId?.gradeDetail.cycleDetail.schoolYear.year})`,
      behavioralHistoryYear: behavioralHistory.sectionDetailId?.gradeDetail.cycleDetail.schoolYear.year,
      foulsAlert: getFoulsAlertState(behavioralHistory.foulSanctionAssignations),
      expedients: syncWithStudentExpedients(
        studentAcademicData.expedients,
        behavioralHistory.sectionDetailId?.gradeDetail.grade.name,
        behavioralHistory.sectionDetailId?.gradeDetail.cycleDetail.schoolYear.year,
      ),
    }));
    if (administrative || commentsOnly === 'true') {
      return {
        data: plainToClass(StudentBehavioralHistoryInformation, dataToReturn, { excludeExtraneousValues: true }),
      };
    }
    return {
      data: plainToClass(StudentBehavioralHistoryInformation, [dataToReturn[0]], { excludeExtraneousValues: true }),
    };
  }

  async getStudentBehavioralHistory(
    userId: number,
    studentHistoryIdsDto: StudentHistoryIdsDto,
    pdfRequestFiltersDto: PdfRequestFilterDto,
  ): Promise<StudentBehavioralHistoryInformationReport> {
    const { filter } = pdfRequestFiltersDto;
    const { data } = await this.getStudentBehavioralHistories(studentHistoryIdsDto, userId, {});
    const behavioralHistory = data.filter(history => history.id === studentHistoryIdsDto.historyId)[0];
    if (!behavioralHistory) {
      throw new NotFoundException('El historial académico y conductual no fue encontrado');
    }
    const fouls = includeFouls(filter);
    const behavioralHistoryfouls: CompleteBehavioralHistoryFouls[] = [];
    if (fouls) {
      const periods = await this.periodRepository.find();
      const foulsAssignations = await this.foulSanctionAssignationRepository.findBehavioralHistoryFouls(
        studentHistoryIdsDto,
      );
      periods.map(async period => {
        const periodCode = period.name.split(' ')[0] as TPeriod;
        if (filter && filter.split(',').includes(EPeriodCode[periodCode])) {
          behavioralHistoryfouls.push({
            period: period.name,
            foulsCounter: getFoulsCounter(foulsAssignations, period.id),
            fouls: getFoulsByPeriod(foulsAssignations, period.id),
          });
        }
      });
    }
    const behavioralHistoryToReturn = {
      ...behavioralHistory,
      finalConclusion:
        filter && filter.split(',').includes('finalConclusion') ? behavioralHistory.finalConclusion : null,
      expedients: filter && filter.split(',').includes('expedients') ? behavioralHistory.expedients : [],
      annotations:
        filter && filter.split(',').includes('annotations')
          ? await this.classDiaryRepository.getAllHistoryAnnotations(studentHistoryIdsDto)
          : [],
      behavioralHistoryfouls,
    };
    return plainToClass(StudentBehavioralHistoryInformationReport, behavioralHistoryToReturn, {
      excludeExtraneousValues: true,
    });
  }
}
