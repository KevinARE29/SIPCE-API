import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '@schedules/repositories/schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}
}
