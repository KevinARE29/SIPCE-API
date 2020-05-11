import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty()
  accessToken!: string;
  refreshToken!: string;
  exp?: number;
}
