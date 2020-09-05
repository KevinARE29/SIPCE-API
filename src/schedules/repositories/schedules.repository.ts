import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Schedule } from '../entities/schedules.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  async findByIdOrThrow(id: number): Promise<Schedule> {
    const event = await this.findOne(id, { relations: ['ownerSchedule'] });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }
}
