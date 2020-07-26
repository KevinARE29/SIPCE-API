import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftRepository } from './repositories/shift.repository';
import { CycleDetailRepository } from './repositories/cycle-detail.repository';
import { CycleRepository } from './repositories/cycle.repository';
import { GradeDetailRepository } from './repositories/grade-detail.repository';
import { GradeRepository } from './repositories/grade.repository';
import { SectionDetailRepository } from './repositories/section-detail.repository';
import { SectionRepository } from './repositories/section.repository';
import { SectionController } from './controllers/section.controller';
import { SectionService } from './services/section.service';
import { CycleController } from './controllers/cycle.controller';
import { CycleService } from './services/cycle.service';
import { GradeService } from './services/grade.service';
import { GradeController } from './controllers/grade.controller';
import { PeriodService } from './services/period.service';
import { PeriodController } from './controllers/period.controller';
import { PeriodRepository } from './repositories/period.repository';
import { ShiftService } from './services/shift.service';
import { ShiftController } from './controllers/shift.controller';
import { SchoolYearRepository } from './repositories/school-year.repository';
import { SchoolYearController } from './controllers/school-year.controller';
import { SchoolYearService } from './services/school-year.service';

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
      PeriodRepository,
      SchoolYearRepository,
    ]),
  ],
  controllers: [
    SectionController,
    CycleController,
    GradeController,
    PeriodController,
    ShiftController,
    SchoolYearController,
  ],
  providers: [SectionService, CycleService, GradeService, PeriodService, ShiftService, SchoolYearService],
  exports: [TypeOrmModule],
})
export class AcademicsModule {}
