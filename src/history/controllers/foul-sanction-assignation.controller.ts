import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { FoulSanctionAssignationService } from '@history/services/foul-sanction-assignation.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('History Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('assignation/foul')
export class FoulSanctionAssignationController {
  constructor(private readonly sanctionsService: FoulSanctionAssignationService) {}
}
