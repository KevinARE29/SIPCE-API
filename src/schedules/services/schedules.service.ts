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
import { User } from '@users/entities/users.entity';
import { UserRepository } from '@users/repositories/users.repository';
import { EnumEventType } from '@schedules/constants/schedule.costants';


@Injectable()
export class SchedulesService {
  

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
   
  ) {}

  
  async createEvent(ownerSchedule:User ,createScheduleDto: CreateScheduleDto): Promise<SchedulesResponse> {
    
    
    const {
      ...scheduleDto
     
    } = createScheduleDto;
    const eventConflict= await this.scheduleRepository.findConflict(scheduleDto.startTime,scheduleDto.endTime)
    //const ownerSchedule=ownerScheduleUser.id;
   

    return {
      data: plainToClass(ScheduleDoc, await this.scheduleRepository.save(
        {...scheduleDto,
          eventType: EnumEventType[scheduleDto.eventType],
          ownerSchedule,
          eventConflict,
          
        
        }) ,{
          excludeExtraneousValues: true,
        }
        )
      
      
      
      
      }

    }
}
