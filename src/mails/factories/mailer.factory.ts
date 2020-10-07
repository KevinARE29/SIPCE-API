import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

require('dotenv').config();

export const mailerFactory = () => ({
  transport: `smtps://${process.env.EMAIL_USER}:${process.env.EMAIL_PSW}@smtp.gmail.com`,
  defaults: {
    from: '"Liceo Salvadoreño" <noreply@gmail.com>',
  },
  template: {
    dir: `./src/mails/templates`,
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
});
