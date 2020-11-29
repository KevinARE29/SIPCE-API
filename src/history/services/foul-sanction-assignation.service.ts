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

  async createFouls(
    createFoulSanctionAssignationDto: CreateFoulSanctionAssignationDto,
  ): Promise<FoulSanctionAssignationResponse> {
    const { periodId, foulId, sanctionId, behavioralHistoryId } = createFoulSanctionAssignationDto;

    let periodIdAsignation;
    let behavioralHistoryIdAssignation;
    let sanctionIdAssignation;
    let foulIdAssignation;

    if (periodId) {
      periodIdAsignation = await this.periodRepository.findOne(periodId);
    }
    if (foulId) {
      foulIdAssignation = await this.foulsRepository.findOne(foulId);
    }
    if (sanctionId) {
      sanctionIdAssignation = await this.sanctionsRepository.findOne(sanctionId);
    }
    if (behavioralHistoryId) {
      behavioralHistoryIdAssignation = await this.periodRepository.findOne(periodId);
    }

    return {
      data: plainToClass(
        FoulSanctionAssignationDoc,
        await this.foulSanctionAssignationRepository.save({
          periodIdAsignation,
          foulIdAssignation,
          sanctionIdAssignation,
          behavioralHistoryIdAssignation,
          createFoulSanctionAssignationDto,
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }
}
