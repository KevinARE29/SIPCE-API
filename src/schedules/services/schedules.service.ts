/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  Injectable, NotFoundException,

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
import { UpdateScheduleDto } from '@schedules/dtos/update-schedule.dto';
import { Schedule } from '@schedules/entities/schedules.entity';


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
      eventType,
      ...scheduleDto
     
    } = createScheduleDto;

    let studentSchedule;
    let employeesSchedule;
    const type=EnumEventType[eventType];

    if (type!=4 && type!=5 )
    {
      
            if (studentId)
            {
              studentSchedule = await this.studentRepository.findOneOrFail(studentId);
            }
            if (participantIds)
            {
            employeesSchedule = await this.userRepository.findByIds(participantIds);
            }
        
    }


    return {
      data: plainToClass(ScheduleDoc, await this.scheduleRepository.save(
        {
          ...scheduleDto,
          eventType: EnumEventType[eventType],
          ownerSchedule,
          studentSchedule,
          employeesSchedule

        }) ,{
          excludeExtraneousValues: true,
        }
        )
      }

    }

    

    async updateEvent(eventId: number, updateScheduleDto: UpdateScheduleDto): Promise<SchedulesResponse> {
      const event = await this.scheduleRepository.getScheduleByIdOrThrow(eventId);
      
     const {
      studentId,
      participantIds,
      eventType,
      ...scheduleDto
     } = updateScheduleDto;

     let studentSchedule;
     let employeesSchedule;
     let  type;
     if (eventType)
      { type=EnumEventType[eventType];
       event.eventType=type;
      }
      else
        type=event.eventType;
 
     if (type!=4 && type!=5 )
     {
             if (studentId)
             {
               studentSchedule = await this.studentRepository.findOneOrFail(studentId);
               event.studentSchedule=studentSchedule;
             }
 
             if (participantIds)
             {
             employeesSchedule = await this.userRepository.findByIds(participantIds);
             event.employeesSchedule=employeesSchedule;
             }
         
     }
     
     const updatedEvent = await this.scheduleRepository.save({
      ...event,
      ...scheduleDto,
    });



      return {
        data: plainToClass(ScheduleDoc, await this.scheduleRepository.save({ ...updatedEvent }), {
          excludeExtraneousValues: true,
        }),
      };
    }

    async deleteEvent(eventId: number): Promise<void> {
      const event = await this.findByIdOrThrow(eventId);
      
      await this.scheduleRepository.query(
        `DELETE FROM schedule ` +
          `WHERE id IN (${eventId})`,
      );

      //await this.scheduleRepository.save(event);
    }


    async findByIdOrThrow(id: number): Promise<Schedule> {
      const event = await this.scheduleRepository.findOne(id);
      if (!event) {
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      return event;
    }

}
