import { Controller, UseGuards, Body, Post } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import {  ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { CreateScheduleDto } from '@schedules/dtos/create-schedule.dto';
import { SchedulesResponse } from '@schedules/docs/schedules-response.doc';
import { SchedulesService } from '../services/schedules.service';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';

@ApiTags('Schedules Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  
  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Crear Eventos en calendario',
    description: 'Use este endpoint para crear nuevos eventos en el calendario de un usuario.',
  })
  @Post('')
  createEvent(@User() reqUser: IAuthenticatedUser,@Body() createScheduleDto: CreateScheduleDto): Promise<SchedulesResponse> {
    return this.schedulesService.createEvent(createScheduleDto);
  }

 
}
