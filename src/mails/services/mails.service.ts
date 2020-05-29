import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setApiKey, send } from '@sendgrid/mail';
import { ClientResponse } from '@sendgrid/client/src/response';
import { IEmail } from '../interfaces/email.interface';

@Injectable()
export class MailsService {
  constructor(private readonly configService: ConfigService) {
    setApiKey(this.configService.get('SENDGRID_API_KEY') || '');
  }

  sendEmail(email: IEmail): Promise<[ClientResponse, {}]> {
    return send(email);
  }
}
