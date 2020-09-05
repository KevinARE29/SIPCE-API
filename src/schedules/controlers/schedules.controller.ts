import { Controller, UseGuards, Body, Post, Param, Put, HttpCode, Delete } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import {  ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { CreateScheduleDto } from '@schedules/dtos/create-schedule.dto';
import { SchedulesResponse } from '@schedules/docs/schedules-response.doc';
import { SchedulesService } from '../services/schedules.service';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { UpdateScheduleDto } from '@schedules/dtos/update-schedule.dto';
import { ScheduleIdDto } from '@schedules/dtos/schedule-id.dto';
import { UserRepository } from '@users/repositories/users.repository';


@ApiTags('Schedules Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly userRepository: UserRepository) {}

  
  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Crear Eventos en calendario',
    description: 'Use este endpoint para crear nuevos eventos en el calendario de un usuario.',
  })
  @Post('me')
  async createEvent(@User() reqUser: IAuthenticatedUser,@Body() createScheduleDto: CreateScheduleDto): Promise<SchedulesResponse> {
    const user = await this.userRepository.findOneOrFail(reqUser.id);
    return  this.schedulesService.createEvent( user,createScheduleDto);
  }

  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Actualizar un evento específico',
    description: 'Use este endpoint para actualizar los datos de un evento específico',
  })
  @Put('me/:eventId')
  updateStudent(
    @Param() scheduleIdDto: ScheduleIdDto,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<SchedulesResponse> {
    return this.schedulesService.updateEvent(scheduleIdDto.eventId, updateScheduleDto);
  }

  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Eliminar Ciclos',
    description: 'Use este endpoint para eliminar un ciclo específico',
  })
  @HttpCode(204)
  @Delete('me/:eventId')
  deleteCycle(@Param() idDto: ScheduleIdDto): Promise<void> {
    return this.schedulesService.deleteEvent(idDto.eventId);
  }
 
}
