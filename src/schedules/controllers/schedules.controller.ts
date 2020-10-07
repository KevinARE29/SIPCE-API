import { Controller, UseGuards, Body, Post, Param, Put, HttpCode, Delete, Get, Query } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { CreateScheduleDto } from '@schedules/dtos/create-schedule.dto';
import { SchedulesResponse } from '@schedules/docs/schedules-response.doc';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { UpdateScheduleDto } from '@schedules/dtos/update-schedule.dto';
import { ScheduleIdDto } from '@schedules/dtos/schedule-id.dto';
import { UserRepository } from '@users/repositories/users.repository';
import { ScheduleFilterDto } from '@schedules/dtos/schedule-filter.dto';
import { SchedulesService } from '../services/schedules.service';

@ApiTags('Schedules Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('me/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService, private readonly userRepository: UserRepository) {}

  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Buscar Eventos en calendario',
    description: 'Use este endpoint para buscar eventos en el calendario en un rango específico de tiempo.',
  })
  @Get('')
  async gestEvents(@User() reqUser: IAuthenticatedUser, @Query() scheduleFilterDto: ScheduleFilterDto): Promise<any> {
    return this.schedulesService.getEvents(reqUser.id, scheduleFilterDto);
  }

  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Crear Eventos en calendario',
    description: 'Use este endpoint para crear nuevos eventos en el calendario de un usuario.',
  })
  @Post('')
  async createEvent(
    @User() reqUser: IAuthenticatedUser,
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<SchedulesResponse> {
    const user = await this.userRepository.findOneOrFail(reqUser.id);
    return this.schedulesService.createEvent(user, createScheduleDto);
  }

  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Actualizar un evento específico',
    description: 'Use este endpoint para actualizar los datos de un evento específico',
  })
  @Put(':eventId')
  async updateEvent(
    @User() reqUser: IAuthenticatedUser,
    @Param() scheduleIdDto: ScheduleIdDto,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<SchedulesResponse> {
    const user = await this.userRepository.findOneOrFail(reqUser.id);
    return this.schedulesService.updateEvent(user, scheduleIdDto.eventId, updateScheduleDto);
  }

  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Eliminar Eventos',
    description: 'Use este endpoint para eliminar un evento específico',
  })
  @HttpCode(204)
  @Delete(':eventId')
  async deleteEvent(@User() reqUser: IAuthenticatedUser, @Param() idDto: ScheduleIdDto): Promise<void> {
    const user = await this.userRepository.findOneOrFail(reqUser.id);
    return this.schedulesService.deleteEvent(user, idDto.eventId);
  }

  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'marcar evento como leido',
    description: 'Use este endpoint para marcar las notificaciones de evntos como leidas',
  })
  @Put('/notification:eventId')
  async readNotification(@User() reqUser: IAuthenticatedUser, @Param() idDto: ScheduleIdDto): Promise<void> {
    const user = await this.userRepository.findOneOrFail(reqUser.id);
    return this.schedulesService.readNotification(user, idDto.eventId);
  }
}
