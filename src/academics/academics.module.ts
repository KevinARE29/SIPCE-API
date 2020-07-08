import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftRepository } from './repositories/shift.repository';
import { CycleDetailRepository } from './repositories/cycle-detail.repository';
import { CycleRepository } from './repositories/cycle.repository';
import { GradeDetailRepository } from './repositories/grade-detail.repository';
import { GradeRepository } from './repositories/grade.repository';
import { SectionDetailRepository } from './repositories/section-detail.repository';
import { SectionRepository } from './repositories/section.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShiftRepository,
      CycleDetailRepository,
      CycleRepository,
      GradeDetailRepository,
      GradeRepository,
      SectionDetailRepository,
      SectionRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class AcademicsModule {}
