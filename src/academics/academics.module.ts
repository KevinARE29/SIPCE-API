import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '@students/students.module';
import {
  SectionController,
  CycleController,
  GradeController,
  PeriodController,
  ShiftController,
  SchoolYearController,
  CloseSchoolYearController,
  SectionDetailController,
} from './controllers';
import {
  ShiftRepository,
  CycleDetailRepository,
  CycleRepository,
  GradeDetailRepository,
  GradeRepository,
  SectionDetailRepository,
  SectionRepository,
  PeriodRepository,
  SchoolYearRepository,
} from './repositories';
import {
  SectionService,
  CycleService,
  GradeService,
  PeriodService,
  ShiftService,
  SchoolYearService,
  CloseSchoolYearService,
  AssignationService,
  SectionDetailService,
} from './services';

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
    forwardRef(() => StudentModule),
  ],
  controllers: [
    SectionController,
    CycleController,
    GradeController,
    PeriodController,
    ShiftController,
    SchoolYearController,
    CloseSchoolYearController,
    SectionDetailController,
  ],
  providers: [
    AssignationService,
    SectionService,
    CycleService,
    GradeService,
    PeriodService,
    ShiftService,
    SchoolYearService,
    CloseSchoolYearService,
    SectionDetailService,
  ],
  exports: [TypeOrmModule, AssignationService],
})
export class AcademicsModule {}
