import { FoulSanctionAssignationResponse } from '@history/docs/foul-sanction-assignation-response.doc';
import { CreateFoulSanctionAssignationDto } from '@history/dtos/create-foul-sanction-assignation.dto';
import { FoulSanctionAssignationRepository } from '@history/repository/foul-sanction-assignation.repository';
import { Injectable } from '@nestjs/common';
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
    if (foulSanctionAssignationFilterDto.paginate === 'false') {
      const [assignations] = await this.foulSanctionAssignationRepository.getAllFoulSantionAssignation(
        pageDto,
        foulSanctionAssignationFilterDto,
        studentHistoryIdsDto,
      );
      return { data: plainToClass(FoulSanctionAssignationDoc, assignations, { excludeExtraneousValues: true }) };
    }
    const [assignations, count] = await this.sanctionsRepository.getAllSanctions(
      pageDto,
      foulSanctionAssignationFilterDto,
    );
    const pagination = getPagination(pageDto, count);
    return {
      data: plainToClass(FoulSanctionAssignationDoc, assignations, { excludeExtraneousValues: true }),
      pagination,
    };
  }

  async getSingleFoulSanctionAssignation(
    foulSanctionAssignationIdDto: FoulSanctionAssignationIdDto,
  ): Promise<FoulSanctionAssignationResponse> {
    await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(foulSanctionAssignationIdDto);
    const sanction = await this.foulSanctionAssignationRepository.findByIdOrThrow(
      foulSanctionAssignationIdDto.assignationId,
    );
    return { data: plainToClass(FoulSanctionAssignationDoc, sanction, { excludeExtraneousValues: true }) };
  }

  async createFoulSanctionAssignation(
    createFoulSanctionAssignationDto: CreateFoulSanctionAssignationDto,
    studentHistoryIdsDto: StudentHistoryIdsDto,
  ): Promise<FoulSanctionAssignationResponse> {
    await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(studentHistoryIdsDto);
    const {
      periodIdAssignation,
      foulIdAssignation,
      sanctionIdAssignation,
      behavioralHistoryIdAssignation,
    } = createFoulSanctionAssignationDto;

    let periodId;
    let behavioralHistoryId;
    let sanctionId;
    let foulId;

    if (periodIdAssignation) {
      periodId = await this.periodRepository.findOneOrFail(periodIdAssignation);
    }
    if (foulIdAssignation) {
      foulId = await this.foulsRepository.findOneOrFail(foulIdAssignation);
    }
    if (sanctionIdAssignation) {
      sanctionId = await this.sanctionsRepository.findOneOrFail(sanctionIdAssignation);
    }
    if (behavioralHistoryIdAssignation) {
      behavioralHistoryId = await this.behavioralHistoryRepository.findOneOrFail(behavioralHistoryIdAssignation);
    }

    return {
      data: plainToClass(
        FoulSanctionAssignationDoc,
        await this.foulSanctionAssignationRepository.save({
          periodId,
          foulId,
          sanctionId,
          behavioralHistoryId,
          createFoulSanctionAssignationDto,
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async updateFoulSanctionAssignation(
    updateFoulSanctionAssignationDto: UpdateFoulSanctionAssignationDto,
    foulSanctionAssignationIdDto: FoulSanctionAssignationIdDto,
  ): Promise<FoulSanctionAssignationResponse> {
    await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(foulSanctionAssignationIdDto);
    const currentAssignation = await this.foulSanctionAssignationRepository.findByIdOrThrow(
      foulSanctionAssignationIdDto.assignationId,
    );

    const {
      periodIdAssignation,
      foulIdAssignation,
      sanctionIdAssignation,
      behavioralHistoryIdAssignation,
    } = updateFoulSanctionAssignationDto;

    if (periodIdAssignation) {
      currentAssignation.periodId = await this.periodRepository.findOneOrFail(periodIdAssignation);
    }
    if (foulIdAssignation) {
      currentAssignation.foulId = await this.foulsRepository.findOneOrFail(foulIdAssignation);
    }
    if (sanctionIdAssignation) {
      currentAssignation.sanctionId = await this.sanctionsRepository.findOneOrFail(sanctionIdAssignation);
    }
    if (behavioralHistoryIdAssignation) {
      currentAssignation.behavioralHistoryId = await this.behavioralHistoryRepository.findOneOrFail(
        behavioralHistoryIdAssignation,
      );
    }

    return {
      data: plainToClass(
        FoulSanctionAssignationDoc,
        await this.foulSanctionAssignationRepository.save({
          ...currentAssignation,
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async deleteFoulSanctionAssignation(foulSanctionAssignationIdDto: FoulSanctionAssignationIdDto): Promise<void> {
    await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(foulSanctionAssignationIdDto);
    const assignation = await this.foulSanctionAssignationRepository.findByIdOrThrow(
      foulSanctionAssignationIdDto.assignationId,
    );
    assignation.deletedAt = new Date();
    await this.foulSanctionAssignationRepository.save(assignation);
  }
}
