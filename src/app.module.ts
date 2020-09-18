import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from '@logs/log.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { AcademicsModule } from '@academics/academics.module';
import { StudentModule } from '@students/students.module';
import { SchedulesModule } from '@schedules/schedules.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        API_URL: Joi.string().required(),
        FRONT_URL: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        JWT_SECRET_ACCESS_TOKEN: Joi.string().required(),
        JWT_SECRET_REFRESH_TOKEN: Joi.string().required(),
        JWT_SECRET_PASSWORD_RESET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.number().default(1200000), // 20 min
        REFRESH_TOKEN_EXPIRATION: Joi.number().default(7200000), // 2 hours
        PASSWORD_RESET_EXPIRATION: Joi.number().default(86400000), // 24 hours
        TYPEORM_CONNECTION: Joi.string().default('postgres'),
        TYPEORM_HOST: Joi.string().default('localhost'),
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),
        TYPEORM_SCHEMA: Joi.string().default('public'),
        TYPEORM_PORT: Joi.number().default(5432),
        TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
        TYPEORM_ENTITIES: Joi.string().default('src/**/entities/*.js,dist/**/entities/*.js'),
        TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string().default('migration'),
        TYPEORM_MIGRATIONS: Joi.string().default('migrations/*.js, dist/migrations/*.js'),
        TYPEORM_MIGRATIONS_DIR: Joi.string().default('migrations'),
        TYPEORM_MIGRATIONS_RUN: Joi.boolean().default(true),
        TYPEORM_LOGGING: Joi.string().default('error'),
        SENDGRID_API_KEY: Joi.string().required(),
        RESET_PSW_SENDGRID_TEMPLATE_ID: Joi.string().required(),
        GENERATE_CREDENTIALS_TEMPLATE_ID: Joi.string().required(),
        EMAIL_USER: Joi.string().default('noreply.liceo.salvadoreno@gmail.com'),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
        CLOUDINARY_ENVS: Joi.string().default('dev,uat'),
        FILE_EXTENSION_WHITE_LIST: Joi.string().default('jpg,jpeg,png,svg'),
        FILE_SIZE_LIMIT_IN_BYTES: Joi.number().default(5242880), // 5MB
      }),
    }),
    UsersModule,
    AuthModule,
    LogModule,
    AcademicsModule,
    StudentModule,
    SchedulesModule,
  ],
})
export class AppModule {}
