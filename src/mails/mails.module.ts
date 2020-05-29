import { Module } from '@nestjs/common';
import { MailsService } from './services/mails.service';

@Module({
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
