import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ScheduleFilterDto } from '@schedules/dtos/schedule-filter.dto';
import { Schedule } from '../entities/schedules.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  async findByIdOrThrow(id: number): Promise<Schedule> {
    const event = await this.findOne(id, { relations: ['ownerSchedule', 'studentSchedule', 'employeesSchedule'] });
    if (!event) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }
    return event;
  }

  getEvents(userId: number, scheduleFilterDto: ScheduleFilterDto): Promise<Schedule[]> {
    const { fromDate, toDate, notification } = scheduleFilterDto;
    const orCondition = `OR schedule.jsonData ->> 'RecurrenceRule' is not null`;
    const query = this.createQueryBuilder('schedule')
      .leftJoin('schedule.ownerSchedule', 'ownerSchedule')
      .leftJoinAndSelect('schedule.studentSchedule', 'studentSchedule')
      .leftJoinAndSelect('schedule.employeesSchedule', 'employeesSchedule')
      .andWhere(`ownerSchedule.id = ${userId}`)
      .andWhere(`((schedule.jsonData ->> 'StartTime')::timestamp >= '${fromDate}' ${orCondition})`)
      .andWhere(`((schedule.jsonData ->> 'EndTime')::timestamp <= '${toDate}' ${orCondition})`);

    if (notification) {
      query.andWhere(`schedule.notification is ${notification}`);
    }

    query.orderBy(`(schedule.jsonData ->> 'EndTime')::timestamp`);
    return query.getMany();
  }
}
