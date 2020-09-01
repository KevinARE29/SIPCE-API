import { Controller, UseGuards, Body, Post } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import {  ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { CreateScheduleDto } from '@schedules/dtos/create-schedule.dto';
import { SchedulesResponse } from '@schedules/docs/schedules-response.doc';
import { SchedulesService } from '../services/schedules.service';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { UsersService } from '@users/services/users.service';


@ApiTags('Schedules Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly usersService: UsersService) {}

  
  @Auth('manage_schedule')
  @ApiOperation({
    summary: 'Crear Eventos en calendario',
    description: 'Use este endpoint para crear nuevos eventos en el calendario de un usuario.',
  })
  @Post('')
  async createEvent(@User() reqUser: IAuthenticatedUser,@Body() createScheduleDto: CreateScheduleDto): Promise<SchedulesResponse> {
    const user = await this.usersService.findByIdOrThrow(reqUser.id);
    return  this.schedulesService.createEvent( user,createScheduleDto);
  }

 
}
