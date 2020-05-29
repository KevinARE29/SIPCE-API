import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { send } from '@sendgrid/mail';
import { MailsService } from './mails.service';

jest.mock('@sendgrid/mail');

const mockEmail = {
  to: 'fake@email.com',
  from: 'fake@email.com',
  templateId: '',
  dynamicTemplateData: {},
};

describe('Mails Service', () => {
  let mailsService: MailsService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailsService, ConfigService],
    }).compile();

    mailsService = module.get(MailsService);
    configService = module.get(ConfigService);
  });

  it('Should be defined', () => {
    expect(mailsService).toBeDefined();
    expect(configService).toBeDefined();
  });

  describe('Send Reset Password Email', () => {
    it('Should send a reset password email', async () => {
      mailsService.sendEmail(mockEmail);
      expect(send).toHaveBeenCalledTimes(1);
    });
  });
});
