import { EntityRepository, Repository } from 'typeorm';
import { Schedule } from '@schedules/entities/schedule.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {}
