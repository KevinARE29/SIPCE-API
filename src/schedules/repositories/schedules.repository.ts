import { EntityRepository, Repository } from 'typeorm';
import { Schedule } from '../entities/schedules.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  findUserByUsername(username: string): Promise<Schedule | undefined> {
    return this.createQueryBuilder('schedule')
      .leftJoin('schedule.user', 'user')
      .getOne();
  }



 
}
