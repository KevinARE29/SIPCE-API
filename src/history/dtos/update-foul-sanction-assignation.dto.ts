import { PartialType } from '@nestjs/swagger';
import { CreateFoulSanctionAssignationDto } from './create-foul-sanction-assignation.dto';

export class UpdateFoulSanctionAssignationDto extends PartialType(CreateFoulSanctionAssignationDto) {}
