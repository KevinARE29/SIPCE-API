import { IsBoolean, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['code'] as const)) {
  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  readonly active?: boolean;
}
