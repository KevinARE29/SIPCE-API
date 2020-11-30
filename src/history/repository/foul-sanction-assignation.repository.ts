import { EntityRepository, Repository } from 'typeorm';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { FoulSanctionAssignationFilterDto, sortOptionsMap } from '@history/dtos/foul-sanction-assignation-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';
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

  async findByIdOrThrow(id: number): Promise<FoulSanctionAssignation> {
    const query = await this.findOne(id, {
      where: { deletedAt: null },
      relations: ['behavioralHistoryId', 'periodId', 'sanctionId', 'foulId'],
    });
    if (!query) {
      throw new NotFoundException(`Asignación con id ${id} no encontrado`);
    }
    return query;
  }

  getAllFoulSantionAssignation(
    pageDto: PageDto,
    foulSanctionAssignationFilterDto: FoulSanctionAssignationFilterDto,
    studentHistoryIdsDto: StudentHistoryIdsDto,
  ): Promise<[FoulSanctionAssignation[], number]> {
    const { page, perPage } = pageDto;
    const {
      sort,
      issueDateStart,
      issueDateEnd,
      createdStart,
      createdEnd,
      peridoId,
      foulId,
      foulNumeral,
    } = foulSanctionAssignationFilterDto;
    const { historyId } = studentHistoryIdsDto;
    const query = this.createQueryBuilder('foul_sanction_assignation')
      .leftJoinAndSelect('foul_sanction_assignation.behavioralHistoryId', 'behavioralHistoryId')
      .leftJoinAndSelect('foul_sanction_assignation.periodId', 'periodId')
      .leftJoinAndSelect('foul_sanction_assignation.sanctionId', 'sanctionId')
      .leftJoinAndSelect('foul_sanction_assignation.foulId', 'foulId')
      .andWhere(`behavioralHistoryId.id = ${historyId}`)
      .andWhere('foul_sanction_assignation.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'foul_sanction_assignation.id': 'DESC' });
    }

    if (issueDateStart) {
      query.andWhere(`foul_sanction_assignation.issueDate >= '${issueDateStart}'`);
    }

    if (issueDateEnd) {
      query.andWhere(`foul_sanction_assignation.issueDate <= '${issueDateEnd}'`);
    }
    if (createdStart) {
      query.andWhere(`foul_sanction_assignation.issueDate >= '${issueDateStart}'`);
    }

    if (createdEnd) {
      query.andWhere(`foul_sanction_assignation.issueDate <= '${issueDateEnd}'`);
    }

    if (peridoId) {
      query.andWhere(`periodId.id = ${peridoId}`);
    }

    if (foulId) {
      query.andWhere(`foulId.id = ${foulId}`);
    }

    if (foulNumeral) {
      query.andWhere(`foulId.numeral ILIKE '%${foulNumeral}%'`);
    }

    return query.getManyAndCount();
  }
}
