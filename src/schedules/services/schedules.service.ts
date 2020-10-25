/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Schedule as ScheduleDoc } from '@schedules/docs/schedules.doc';
import { SchedulesResponse } from '@schedules/docs/schedules-response.doc';
import { CreateScheduleDto } from '@schedules/dtos/create-schedule.dto';
import { ScheduleRepository } from '@schedules/repositories/schedules.repository';
import { User } from '@users/entities/users.entity';
import { UserRepository } from '@users/repositories/users.repository';
import { EnumEventType, eventsColors } from '@schedules/constants/schedule.constants';
import { StudentRepository } from '@students/repositories/student.repository';
import { UpdateScheduleDto } from '@schedules/dtos/update-schedule.dto';
import { shuffle } from 'lodash';
import { ScheduleStudent } from '@schedules/docs/student.doc';
import { BaseUser } from '@core/docs/base-user.doc';
import { ScheduleFilterDto } from '@schedules/dtos/schedule-filter.dto';
@Injectable()
export class SchedulesService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly studentRepository: StudentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getEvents(userId: number, scheduleFilterDto: ScheduleFilterDto): Promise<any> {
    const events = await this.scheduleRepository.getEvents(userId, scheduleFilterDto);
    const shuffledColors = shuffle(eventsColors);
    const mappedEvents = [];
    const colorsLength = shuffledColors.length;
    for (const [index, event] of events.entries()) {
      const { id, studentSchedule, employeesSchedule, jsonData } = event;
      const mappedEvent = {
        jsonData: {
          ...jsonData,
          Id: id,
          Student: plainToClass(ScheduleStudent, studentSchedule, {
            excludeExtraneousValues: true,
          }),
          Participants: plainToClass(BaseUser, employeesSchedule, {
            excludeExtraneousValues: true,
          }),
          CategoryColor: shuffledColors[((index % colorsLength) + colorsLength) % colorsLength],
        },
      };
      mappedEvents.push(mappedEvent);
    }

    return mappedEvents;
  }

  async createEvent(ownerSchedule: User, createScheduleDto: CreateScheduleDto): Promise<SchedulesResponse> {
    const { studentId, participantIds, eventType, ...scheduleDto } = createScheduleDto;

    let studentSchedule;
    let employeesSchedule;

    if (studentId) {
      studentSchedule = await this.studentRepository.findOneOrFail(studentId);
    }
    if (participantIds) {
      employeesSchedule = await this.userRepository.findByIds(participantIds);
    }

    return {
      data: plainToClass(
        ScheduleDoc,
        await this.scheduleRepository.save({
          ...scheduleDto,
          eventType: EnumEventType[eventType],
          ownerSchedule,
          studentSchedule,
          employeesSchedule,
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async updateEvent(
    ownerSchedule: User,
    eventId: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<SchedulesResponse> {
    const event = await this.scheduleRepository.findByIdOrThrow(eventId);

    if (event.ownerSchedule.id !== ownerSchedule.id) {
      throw new BadRequestException('Solo el propietario del evento puede realizar acciones en el evento');
    }

    const { studentId, participantIds, eventType, ...scheduleDto } = updateScheduleDto;

    let studentSchedule;
    let employeesSchedule;
    let type;
    if (eventType) {
      type = EnumEventType[eventType];
      event.eventType = type;
    } else type = event.eventType;

    if (studentId) {
      studentSchedule = await this.studentRepository.findOneOrFail(studentId);
      event.studentSchedule = studentSchedule;
    }

    if (participantIds) {
      employeesSchedule = await this.userRepository.findByIds(participantIds);
      event.employeesSchedule = employeesSchedule;
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

  async deleteEvent(ownerSchedule: User, eventId: number): Promise<void> {
    const event = await this.scheduleRepository.findByIdOrThrow(eventId);
    if (event.ownerSchedule.id !== ownerSchedule.id) {
      throw new BadRequestException('Solo el propietario del evento puede realizar acciones en el evento');
    }
    await this.scheduleRepository.query(`DELETE FROM schedule WHERE id IN (${event.id})`);
  }

  async readNotification(ownerSchedule: User, eventId: number): Promise<void> {
    const event = await this.scheduleRepository.findByIdOrThrow(eventId);
    if (event.ownerSchedule.id !== ownerSchedule.id) {
      throw new BadRequestException('Solo el propietario del evento puede realizar acciones en el evento');
    }
    event.notification = true;
    await this.scheduleRepository.save(event);
  }
}
