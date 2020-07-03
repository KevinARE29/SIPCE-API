import { EntityRepository, Repository, IsNull } from 'typeorm';
import { Cycle } from '@academics/entities/cycle.entity';

@EntityRepository(Cycle)
export class CycleRepository extends Repository<Cycle> {
  findById(id: number): Promise<Cycle | undefined> {
    return this.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });
  }
}
