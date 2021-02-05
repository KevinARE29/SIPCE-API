import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { IEmail } from '../interfaces/email.interface';

@Injectable()
export class MailsService {
  public readonly apiUrl!: string;

  constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) {
    this.apiUrl = configService.get<string>('API_URL', 'localhost:3000');
  }

  sendEmail(email: IEmail): Promise<any> {
    return this.mailerService.sendMail(email);
  }
}
