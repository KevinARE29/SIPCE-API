import { FoulSanctionAssignationRepository } from '@history/repository/foul-sanction-assignation.repository';
import { Injectable } from '@nestjs/common';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { BehavioralHistoryRepository } from '@history/repository/behavioral-history.repository';
import { PeriodRepository } from '@academics/repositories';
import { getFoulsCounter } from '@history/utils/foul-sanction-assignation.util';
import { FoulsAssignationCounterResponse } from '@history/docs/fouls-assignation-counter-response.doc';

@Injectable()
export class FoulSanctionAssignationService {
  constructor(
    private readonly foulSanctionAssignationRepository: FoulSanctionAssignationRepository,
    private readonly behavioralHistoryRepository: BehavioralHistoryRepository,
    private readonly periodRepository: PeriodRepository,
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
}
