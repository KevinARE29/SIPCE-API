import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import * as helmet from 'helmet';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { AccessLogRepository } from '@logs/repositories/access-log.repository';
import { AllExceptionsFilter } from './core/filters/http-exception.filter';
import { AppModule } from './app.module';

require('module-alias/register');

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const accessLogRepository = app.get(AccessLogRepository);
  app.useGlobalFilters(new AllExceptionsFilter(accessLogRepository));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, validationError: { target: false } }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('SIAPCE API')
    .setDescription(
      'API para el Sistema Informático para el control y seguimiento del historial conductual y expediente psicológico de los estudiantes del colegio Liceo Salvadoreño',
    )
    .addBearerAuth()
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
