import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ESchoolYearStatus, TYearStatus, yearStatusKeys } from '@academics/constants/academic.constants';

export class UpdateSchoolYearStatusDto {
  @ApiProperty({ type: String })
  @IsEnum(ESchoolYearStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${yearStatusKeys}`,
  })
  status!: TYearStatus;
}
