import { Module } from '@nestjs/common';
import { ExpedientService } from '@expedient/services/expedient.service';
import { ExpedientController } from '@expedient/controllers/expedient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository, ResponsibleRepository, ResponsibleStudentRepository } from '@students/repositories';
import { SessionService } from '@expedient/services/session.service';
import { SessionController } from '@expedient/controllers/session.controller';
import { ExpedientRepository } from '@expedient/repositories/expedient.repository';
import { SessionRepository } from '@expedient/repositories/session.repository';
import { EvaluationService } from '@expedient/services/evaluation.service';
import { EvaluationRepository } from '@expedient/repositories/evaluation.repository';
import { SessionResponsibleAssistenceRepository } from '@expedient/repositories/session-responsible-assistence.repository';
import { SessionResponsibleAssistenceService } from '@expedient/services/session-responsible-assistence.service';
import { InterventionProgramRepository } from '@expedient/repositories/intervention-program.repository';
import { InterventionProgramController } from '@expedient/controllers/intervention-program.controller';
import { InterventionProgramService } from '@expedient/services/intervention-program.service';
import { UserRepository } from '@users/repositories/users.repository';
import { ResponsibleService } from '@students/services';
import { SchoolYearRepository } from '@academics/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentRepository,
      SessionRepository,
      ExpedientRepository,
      EvaluationRepository,
      ResponsibleRepository,
      SessionResponsibleAssistenceRepository,
      InterventionProgramRepository,
      UserRepository,
      ResponsibleStudentRepository,
      SchoolYearRepository,
    ]),
  ],
  providers: [
    ExpedientService,
    SessionService,
    EvaluationService,
    SessionResponsibleAssistenceService,
    InterventionProgramService,
    ResponsibleService,
  ],
  controllers: [ExpedientController, SessionController, InterventionProgramController],
  exports: [TypeOrmModule, SessionService, ExpedientService],
})
export class ExpedientModule {}
