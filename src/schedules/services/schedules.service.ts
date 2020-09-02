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
import { StudentRepository } from '@students/repositories/student.repository';


@Injectable()
export class SchedulesService {
  

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly studentRepository: StudentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  
  async createEvent(ownerSchedule:User ,createScheduleDto: CreateScheduleDto): Promise<SchedulesResponse> {
    
    
    const {

      studentId,
      participantIds,
      ...scheduleDto
       
       
     
    } = createScheduleDto;

    const eventConflict= await this.scheduleRepository.findConflict(scheduleDto.startTime,scheduleDto.endTime)
    //const ownerSchedule=ownerScheduleUser.id;
    let studentSchedule;
    let employeesSchedule;

    if (studentId)
    {
       studentSchedule = await this.studentRepository.findOneOrFail(studentId);
    }
    if (participantIds)
    {
     employeesSchedule = await this.userRepository.findByIds(participantIds);
    }

    return {
      data: plainToClass(ScheduleDoc, await this.scheduleRepository.save(
        {
          ...scheduleDto,
          eventType: EnumEventType[scheduleDto.eventType],
          ownerSchedule,
          eventConflict,
          studentSchedule,
          employeesSchedule

        }) ,{
          excludeExtraneousValues: true,
        }
        )
      
      
      
      
      }

    }
}
