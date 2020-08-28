import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from '@schedules/repositories/schedules.repository';
import { SchedulesController } from '@schedules/controlers/schedules.controller';
import { SchedulesService } from '@schedules/services/schedules.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ScheduleRepository])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
