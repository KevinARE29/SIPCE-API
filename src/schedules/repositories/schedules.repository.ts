import { EntityRepository, Repository, Timestamp } from 'typeorm';
import { Schedule } from '../entities/schedules.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  findConflict(startTime: Date, endTime:Date): Promise<Schedule[] | undefined> {
    const query = this.createQueryBuilder('schedule')
    query.andWhere(`"schedule"."start_time" BETWEEN  '${startTime}' AND   '${endTime}' `);
    return query.getMany();
  }
 
}
