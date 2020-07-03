import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftRepository } from './repositories/shift.repository';
import { CycleDetailRepository } from './repositories/cycle-detail.repository';
import { CycleRepository } from './repositories/cycle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftRepository, CycleDetailRepository, CycleRepository])],
  exports: [TypeOrmModule],
})
export class AcademicsModule {}
