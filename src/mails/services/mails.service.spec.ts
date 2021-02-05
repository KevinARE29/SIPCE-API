import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MailsService } from './mails.service';

jest.mock('@nestjs-modules/mailer');

const mockEmail = {
  to: 'fake@email.com',
  template: 'mock-template',
  subject: 'Mock Subject',
  context: {},
};

describe('Mails Service', () => {
  let mailsService: MailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MailsService, MailerService],
    }).compile();

    mailsService = module.get(MailsService);
  });

  it('Should be defined', () => {
    expect(mailsService).toBeDefined();
  });

  describe('Send Reset Password Email', () => {
    it('Should send a reset password email', async () => {
      expect(await mailsService.sendEmail(mockEmail)).toBeUndefined();
    });
  });
});
