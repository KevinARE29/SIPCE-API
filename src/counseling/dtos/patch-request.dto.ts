import { IsEnum } from 'class-validator';
import { ERequestStatus, TRequestStatus, requestStatusKeys } from '@counseling/constants/request.constant';

export class PatchRequestDto {
  @IsEnum(ERequestStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${requestStatusKeys}`,
  })
  readonly status!: TRequestStatus;
}
