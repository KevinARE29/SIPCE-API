import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from '@schedules/repositories/schedules.repository';
import { SchedulesController } from '@schedules/controlers/schedules.controller';
import { SchedulesService } from '@schedules/services/schedules.service';
import { UserRepository } from '@users/repositories/users.repository';
import { StudentRepository } from '@students/repositories/student.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ScheduleRepository, StudentRepository, UserRepository])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
