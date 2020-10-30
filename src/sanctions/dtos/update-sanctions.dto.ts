import { PartialType } from '@nestjs/swagger';
import { CreateSanctionsDto } from '@sanctions/dtos/create-sanction.dto';

export class UpdateSanctionsDto extends PartialType(CreateSanctionsDto) {}
