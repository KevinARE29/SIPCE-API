import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ScheduleFilterDto } from '@schedules/dtos/schedule-filter.dto';
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

  getEvents(userId: number, scheduleFilterDto: ScheduleFilterDto): Promise<Schedule[]> {
    const { fromDate, toDate } = scheduleFilterDto;
    const orCondition = `OR schedule.jsonData ->> 'RecurrenceRule' is not null`;
    const query = this.createQueryBuilder('schedule')
      .leftJoin('schedule.ownerSchedule', 'ownerSchedule')
      .leftJoinAndSelect('schedule.studentSchedule', 'studentSchedule')
      .leftJoinAndSelect('schedule.employeesSchedule', 'employeesSchedule')
      .andWhere(`ownerSchedule.id = ${userId}`);
    if (fromDate) {
      query.andWhere(`((schedule.jsonData ->> 'StartTime')::timestamp >= '${fromDate}' ${orCondition})`);
    } else {
      query.andWhere(`((schedule.jsonData ->> 'StartTime')::timestamp >= NOW() - INTERVAL '1' MONTH ${orCondition})`);
    }

    if (toDate) {
      query.andWhere(`((schedule.jsonData ->> 'EndTime')::timestamp <= '${toDate}' ${orCondition})`);
    } else {
      query.andWhere(`((schedule.jsonData ->> 'EndTime')::timestamp <= NOW() + INTERVAL '1' MONTH ${orCondition})`);
    }

    query.orderBy(`(schedule.jsonData ->> 'EndTime')::timestamp`);
    return query.getMany();
  }
}
