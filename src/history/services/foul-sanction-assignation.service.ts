import { FoulSanctionAssignationResponse } from '@history/docs/foul-sanction-assignation-response.doc';
import { CreateFoulSanctionAssignationDto } from '@history/dtos/create-foul-sanction-assignation.dto';
import { FoulSanctionAssignationRepository } from '@history/repository/foul-sanction-assignation.repository';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FoulSanctionAssignation as FoulSanctionAssignationDoc } from '@history/docs/foul-sanction-assignation.doc';
import { plainToClass } from 'class-transformer';
import { SanctionsRepository } from '@sanctions/repository/sanctions.repository';
import { PeriodRepository } from '@academics/repositories';
import { FoulsRepository } from '@fouls/repository/fouls.repository';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { BehavioralHistoryRepository } from '@history/repository/behavioral-history.repository';
import { getFoulsCounter } from '@history/utils/foul-sanction-assignation.util';
import { FoulsAssignationCounterResponse } from '@history/docs/fouls-assignation-counter-response.doc';
import { UpdateFoulSanctionAssignationDto } from '@history/dtos/update-foul-sanction-assignation.dto';
import { PageDto } from '@core/dtos/page.dto';
import { FoulSanctionAssignationResponses } from '@history/docs/fouls-sanctions-assignations-response.doc';
import { FoulSanctionAssignationFilterDto } from '@history/dtos/foul-sanction-assignation-filter.dto';
import { getPagination } from '@core/utils/pagination.util';
import { FoulSanctionAssignationIdDto } from '@history/dtos/foul-sanction-assignation-id.dto';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import { FoulSanctionAssignation } from '@history/entities/foul-sanction-assignation.entity';

@Injectable()
export class FoulSanctionAssignationService {
  constructor(
    private readonly foulSanctionAssignationRepository: FoulSanctionAssignationRepository,
    private readonly behavioralHistoryRepository: BehavioralHistoryRepository,
    private readonly periodRepository: PeriodRepository,
    private readonly sanctionsRepository: SanctionsRepository,
    private readonly foulsRepository: FoulsRepository,
  ) {}

  async findAllFoulsOnHistory(studentHistoryIdsDto: StudentHistoryIdsDto): Promise<FoulsAssignationCounterResponse> {
    await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(studentHistoryIdsDto);
    const foulAssignations = await this.foulSanctionAssignationRepository.findBehavioralHistoryFouls(
      studentHistoryIdsDto,
    );
    const activePeriods = await this.periodRepository.find({ where: { active: true } });
    const foulsCounter = activePeriods.map(period => ({
      period: period.name,
      foulsCounter: getFoulsCounter(foulAssignations, period.id),
    }));
    return { data: foulsCounter };
  }

  async getAllFoulSanctionAssignation(
    pageDto: PageDto,
    foulSanctionAssignationFilterDto: FoulSanctionAssignationFilterDto,
    studentHistoryIdsDto: StudentHistoryIdsDto,
  ): Promise<FoulSanctionAssignationResponses> {
    await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(studentHistoryIdsDto);
    const [assignations, count] = await this.foulSanctionAssignationRepository.getAllFoulSantionAssignation(
      pageDto,
      foulSanctionAssignationFilterDto,
      studentHistoryIdsDto,
    );
    const pagination = getPagination(pageDto, count);
    return {
      data: plainToClass(FoulSanctionAssignationDoc, assignations, { excludeExtraneousValues: true }),
      pagination,
    };
  }

  async createFoulSanctionAssignation(
    teacherId: number,
    createFoulSanctionAssignationDto: CreateFoulSanctionAssignationDto,
    studentHistoryIdsDto: StudentHistoryIdsDto,
  ): Promise<FoulSanctionAssignationResponse> {
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

    const { periodIdAssignation, foulIdAssignation, sanctionIdAssignation } = createFoulSanctionAssignationDto;
    const periodId = await this.periodRepository.getPeriodByIdOrThrow(periodIdAssignation);
    const foulId = await this.foulsRepository.findByIdOrThrow(foulIdAssignation);
    const assignationtoSave: Partial<FoulSanctionAssignation> = {
      ...createFoulSanctionAssignationDto,
      behavioralHistoryId: behavioralHistory,
      periodId,
      foulId,
    };

    if (sanctionIdAssignation) {
      assignationtoSave.sanctionId = await this.sanctionsRepository.findByIdOrThrow(sanctionIdAssignation);
    }

    return {
      data: plainToClass(
        FoulSanctionAssignationDoc,
        await this.foulSanctionAssignationRepository.save(assignationtoSave),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async updateFoulSanctionAssignation(
    teacherId: number,
    updateFoulSanctionAssignationDto: UpdateFoulSanctionAssignationDto,
    foulSanctionAssignationIdDto: FoulSanctionAssignationIdDto,
  ): Promise<FoulSanctionAssignationResponse> {
    const behavioralHistory = await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(
      foulSanctionAssignationIdDto,
    );
    const schoolYearStatus = behavioralHistory.sectionDetailId?.gradeDetail.cycleDetail.schoolYear.status;
    if (schoolYearStatus === ESchoolYearStatus.Histórico) {
      throw new UnprocessableEntityException(
        'Ya no se pueden realizar modificaciones ya que el año escolar ha finalizado',
      );
    }
    if (behavioralHistory.sectionDetailId?.teacher.id !== teacherId) {
      throw new UnprocessableEntityException('No tienes los permisos para realizar esta operación ');
    }
    const currentAssignation = await this.foulSanctionAssignationRepository.findByIdOrThrow(
      foulSanctionAssignationIdDto.assignationId,
    );

    const timeDiff = this.getTimeDiff(currentAssignation.createdAt);
    if (timeDiff) {
      throw new UnprocessableEntityException(
        'No se puede eliminar esta asignación ya que han transcurrido más de 24 horas desde su registro',
      );
    }

    const { periodIdAssignation, foulIdAssignation, sanctionIdAssignation } = updateFoulSanctionAssignationDto;

    if (periodIdAssignation) {
      currentAssignation.periodId = await this.periodRepository.getPeriodByIdOrThrow(periodIdAssignation);
    }
    if (foulIdAssignation) {
      currentAssignation.foulId = await this.foulsRepository.findByIdOrThrow(foulIdAssignation);
    }
    if (sanctionIdAssignation) {
      currentAssignation.sanctionId = await this.sanctionsRepository.findByIdOrThrow(sanctionIdAssignation);
    }

    return {
      data: plainToClass(
        FoulSanctionAssignationDoc,
        await this.foulSanctionAssignationRepository.save(currentAssignation),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async deleteFoulSanctionAssignation(
    teacherId: number,
    foulSanctionAssignationIdDto: FoulSanctionAssignationIdDto,
  ): Promise<void> {
    const behavioralHistory = await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(
      foulSanctionAssignationIdDto,
    );
    if (behavioralHistory.sectionDetailId?.teacher.id !== teacherId) {
      throw new UnprocessableEntityException('No tienes los permisos para realizar esta operación ');
    }
    const assignation = await this.foulSanctionAssignationRepository.findByIdOrThrow(
      foulSanctionAssignationIdDto.assignationId,
    );
    const timeDiff = this.getTimeDiff(assignation.createdAt);
    if (timeDiff) {
      throw new UnprocessableEntityException(
        'No se puede eliminar esta asignación ya que han transcurrido más de 24 horas desde su registro',
      );
    }
    assignation.deletedAt = new Date();
    this.foulSanctionAssignationRepository.save(assignation);
  }

  getTimeDiff(annotationCreatedAtDate: Date): boolean {
    const currentDate = new Date();
    const diff = currentDate.getTime() - annotationCreatedAtDate.getTime();
    const hoursDiff = diff / (1000 * 60 * 60);
    return hoursDiff > 24;
  }
}
