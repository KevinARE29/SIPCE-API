import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { EReportName, reportNameKeys, TReportNameValues } from '@reporting/constants/reporting.constant';

export class PdfRequestDto {
  @ApiProperty({ enum: EReportName })
  @IsEnum(EReportName, {
    message: `reportName: Debe ser uno de los siguientes valores: ${reportNameKeys}`,
  })
  readonly reportName?: TReportNameValues;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly reportPath!: string;
}
