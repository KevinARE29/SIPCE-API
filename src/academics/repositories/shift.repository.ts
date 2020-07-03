import { EntityRepository, Repository } from 'typeorm';
import { Shift } from '@academics/entities/shift.entity';

@EntityRepository(Shift)
export class ShiftRepository extends Repository<Shift> {
  findById(id: number): Promise<Shift | undefined> {
    return this.findOne({
      where: {
        id,
        active: true,
      },
    });
  }
}
