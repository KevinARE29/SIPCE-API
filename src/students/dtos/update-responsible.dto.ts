import { PartialType } from '@nestjs/swagger';
import { ResponsibleDto } from './responsible.dto';

export class UpdateResponsibleDto extends PartialType(ResponsibleDto) {}
