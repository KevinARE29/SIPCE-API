import { PartialType } from '@nestjs/swagger';
import { CreateFoulsDto } from '@fouls/dtos/create-foul.dto';

export class UpdateFoulsDto extends PartialType(CreateFoulsDto) {}
