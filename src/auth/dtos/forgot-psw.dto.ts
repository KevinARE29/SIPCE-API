import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPswDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
