import { EntityRepository, Repository, In } from 'typeorm';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';
import { SchoolYear } from '@academics/entities/school-year.entity';
import { Shift } from '@academics/entities/shift.entity';
import { Cycle } from '@academics/entities/cycle.entity';

@EntityRepository(CycleDetail)
export class CycleDetailRepository extends Repository<CycleDetail> {
  findCycleDetails(shift: number, year: number): Promise<CycleDetail[]> {
    return this.createQueryBuilder('cycleDetail')
      .where({ shift, year })
      .loadRelationIdAndMap('cycleDetail.cycle', 'cycleDetail.cycle')
      .getMany();
  }

  async findOrCreateCycleDetails(schoolYear: SchoolYear, shift: Shift, cycleIds: number[]): Promise<CycleDetail[]> {
    const existingCycleDetails = await this.find({ where: { shift, schoolYear, cycle: In(cycleIds) } });
    if (existingCycleDetails.length === cycleIds.length) {
      return existingCycleDetails;
    }
    const existingCycleDetailIds = existingCycleDetails.map(cDetail => cDetail.cycle.id);
    const missingCycleDetails: { schoolYear: SchoolYear; shift: Shift; cycle: Cycle }[] = [];

    cycleIds.forEach(id => {
      if (!existingCycleDetailIds.includes(id)) {
        missingCycleDetails.push({
          schoolYear,
          shift,
          cycle: { id } as Cycle,
        });
      }
    });
    const newCycleDetails = await this.save(missingCycleDetails);
    return [...existingCycleDetails, ...newCycleDetails];
  }
}
