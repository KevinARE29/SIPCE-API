import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@users/repositories/users.repository';
import { PeriodRepository } from '@academics/repositories';
import { StudentRepository } from '@students/repositories';
import { SanctionsRepository } from '@sanctions/repository/sanctions.repository';
import { FoulsRepository } from '@fouls/repository/fouls.repository';
import { FoulSanctionAssignationController } from './controllers/foul-sanction-assignation.controller';
import { FoulSanctionAssignationRepository } from './repository/foul-sanction-assignation.repository';
import { FoulSanctionAssignationService } from './services/foul-sanction-assignation.service';
import { ClassDiaryRepository } from './repository/class-diary.repository';
import { ClassDiaryService } from './services/class-diary.service';
import { ClassDiaryController } from './controllers/class-diary.controller';
import { BehavioralHistoryRepository } from './repository/behavioral-history.repository';
import { BehavioralHistoryService } from './services/behavioral-history.service';
import { BehavioralHistoryController } from './controllers/behavioral-history.controller';
import { MeBehavioralHistoryController } from './controllers/me-behavioral-history.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      FoulSanctionAssignationRepository,
      ClassDiaryRepository,
      BehavioralHistoryRepository,
      UserRepository,
      PeriodRepository,
      StudentRepository,
      SanctionsRepository,
      FoulsRepository,
    ]),
  ],
  controllers: [
    FoulSanctionAssignationController,
    ClassDiaryController,
    BehavioralHistoryController,
    MeBehavioralHistoryController,
  ],
  providers: [FoulSanctionAssignationService, ClassDiaryService, BehavioralHistoryService],
  exports: [BehavioralHistoryService],
})
export class HistoryModule {}
