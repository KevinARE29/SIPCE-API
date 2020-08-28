/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  Injectable,

} from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { Schedule as ScheduleDoc} from '@schedules/docs/schedules.doc';
import { SchedulesResponse } from '@schedules/docs/schedules-response.doc';
import { CreateScheduleDto } from '@schedules/dtos/create-schedule.dto';
import { ScheduleRepository } from '@schedules/repositories/schedules.repository';


@Injectable()
export class SchedulesService {
  

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  
  async createEvent(createScheduleDto: CreateScheduleDto): Promise<SchedulesResponse> {
    return {
      data: plainToClass(ScheduleDoc, await this.scheduleRepository.save({ ...createScheduleDto }), {
        excludeExtraneousValues: true,
      }),
  }

    }
}
