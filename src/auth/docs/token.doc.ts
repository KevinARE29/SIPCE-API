import { Expose } from 'class-transformer';

export class Token {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;

  @Expose()
  exp?: number;
}
