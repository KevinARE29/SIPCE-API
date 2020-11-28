import { EntityRepository, Repository } from 'typeorm';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { FoulSanctionAssignation } from '../entities/foul-sanction-assignation.entity';
@EntityRepository(FoulSanctionAssignation)
export class FoulSanctionAssignationRepository extends Repository<FoulSanctionAssignation> {
  findBehavioralHistoryFouls(studentHistoryIdsDto: StudentHistoryIdsDto): Promise<FoulSanctionAssignation[]> {
    const { historyId } = studentHistoryIdsDto;
    const query = this.createQueryBuilder('foul_sanction_assignation')
      .leftJoinAndSelect('foul_sanction_assignation.behavioralHistoryId', 'behavioralHistoryId')
      .leftJoinAndSelect('foul_sanction_assignation.periodId', 'periodId')
      .leftJoinAndSelect('foul_sanction_assignation.sanctionId', 'sanctionId')
      .leftJoinAndSelect('foul_sanction_assignation.foulId', 'foulId')
      .andWhere(`behavioralHistoryId.id = ${historyId}`)
      .andWhere('foul_sanction_assignation.deletedAt is null');
    return query.getMany();
  }
}
