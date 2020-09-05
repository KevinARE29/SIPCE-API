import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { SectionTeachersDto } from './section-teachers.dto';

export class GradeTeachersDto {
  @IsId()
  readonly gradeId!: number;

  @ApiProperty({ type: [SectionTeachersDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => SectionTeachersDto)
  readonly sections!: SectionTeachersDto[];
}
