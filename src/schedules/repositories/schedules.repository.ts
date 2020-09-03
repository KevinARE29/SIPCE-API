import { EntityRepository, Repository, Timestamp } from 'typeorm';
import { Schedule } from '../entities/schedules.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  findConflict(startTime: Date, endTime:Date): Promise<Schedule[] | undefined> {
    const query = this.createQueryBuilder('schedule')
    query.andWhere(`"schedule"."start_time" BETWEEN  '${startTime}' AND   '${endTime}' `);
    return query.getMany();
  }

  async getScheduleByIdOrThrow(eventId: number): Promise<Schedule> {
    const schedule = await this.findOne(eventId);
    if (!schedule) {
      throw new NotFoundException('Evento no encontrado');
    }
    return schedule;
  }
 
}
