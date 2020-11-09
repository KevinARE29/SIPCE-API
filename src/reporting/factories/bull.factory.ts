import { ConfigService } from '@nestjs/config';

export const bullFactory = async (configService: ConfigService) => ({
  redis: {
    host: configService.get('REDIS_HOST'),
    port: +configService.get('REDIS_PORT'),
    password: configService.get('REDIS_PASSWORD'),
  },
});
