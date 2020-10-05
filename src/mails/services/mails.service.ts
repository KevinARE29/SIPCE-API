import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IEmail } from '../interfaces/email.interface';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(email: IEmail): Promise<any> {
    return this.mailerService.sendMail(email);
  }
}
