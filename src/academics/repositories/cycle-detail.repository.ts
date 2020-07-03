import { EntityRepository, Repository } from 'typeorm';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';

@EntityRepository(CycleDetail)
export class CycleDetailRepository extends Repository<CycleDetail> {
  findCycleDetails(shift: number, year: number): Promise<CycleDetail[]> {
    return this.createQueryBuilder('cycleDetail')
      .where({ shift, year })
      .loadRelationIdAndMap('cycleDetail.cycle', 'cycleDetail.cycle')
      .getMany();
  }
}
