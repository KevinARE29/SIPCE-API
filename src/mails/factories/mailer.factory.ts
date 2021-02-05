import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigService } from '@nestjs/config';

export const mailerFactory = (configService: ConfigService) => {
  const email = configService.get('EMAIL_USER');
  const emailPsw = configService.get('EMAIL_PSW');

  return {
    transport: `smtps://${email}:${emailPsw}@smtp.gmail.com`,
    defaults: {
      from: '"Liceo Salvadoreño" <noreply@gmail.com>',
    },
    preview: false,
    template: {
      dir: `./src/mails/templates`,
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  };
};
