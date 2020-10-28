import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from '@schedules/repositories/schedules.repository';
import { SchedulesController } from '@schedules/controllers/schedules.controller';
import { SchedulesService } from '@schedules/services/schedules.service';
import { UsersModule } from '@users/users.module';
import { StudentModule } from '@students/students.module';
import { MailsModule } from '@mails/mails.module';
import { EventMapper } from './mappers/event.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleRepository]), UsersModule, StudentModule, MailsModule],
  controllers: [SchedulesController],
  providers: [SchedulesService, EventMapper],
})
export class SchedulesModule {}
