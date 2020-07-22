import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from './controllers/schedule.controller';
import { ScheduleRepository } from './repositories/schedule.repository';
import { ScheduleService } from './services/schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleRepository])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [TypeOrmModule],
})
export class SchedulesModule {}
