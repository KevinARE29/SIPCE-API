import { EntityRepository, Repository } from 'typeorm';
import { Shift } from '@academics/entities/shift.entity';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { ShiftFilterDto, sortOptionsMap } from '@academics/dtos/shift-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';

@EntityRepository(Shift)
export class ShiftRepository extends Repository<Shift> {
  getAllShifts(pageDto: PageDto, shiftFilterDto: ShiftFilterDto): Promise<[Shift[], number]> {
    const { page, perPage } = pageDto;
    const { sort, name, active } = shiftFilterDto;
    const query = this.createQueryBuilder('shift')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'shift.id': 'ASC' });
    }

    if (name) {
      query.andWhere(`shift."name" ILIKE '%${name}%'`);
    }

    if (active) {
      query.andWhere(`shift.active is ${active}`);
    }

    return query.getManyAndCount();
  }

  async getShiftByIdOrThrow(shiftId: number): Promise<Shift> {
    const shift = await this.findOne(shiftId);
    if (!shift) {
      throw new NotFoundException('Turno no encontrado');
    }
    return shift;
  }

  findById(id: number): Promise<Shift | undefined> {
    return this.findOne({
      where: {
        id,
        active: true,
      },
    });
  }
}
