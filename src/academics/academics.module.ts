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
  controllers: [SectionController, CycleController, GradeController],
  providers: [SectionService, CycleService, GradeService],
  exports: [TypeOrmModule],
})
export class AcademicsModule {}
