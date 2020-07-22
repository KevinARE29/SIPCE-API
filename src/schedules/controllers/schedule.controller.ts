import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScheduleService } from '@schedules/services/schedule.service';

import { ContentTypeGuard } from '@core/guards/content-type.guard';

@ApiTags('Schedule Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('schedules/')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
}
