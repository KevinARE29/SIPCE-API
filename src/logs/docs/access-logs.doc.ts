import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AccessLogs {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  ip!: string;

  @Expose()
  statusCode!: number;

  @Expose()
  attemptTime!: Date;
}
