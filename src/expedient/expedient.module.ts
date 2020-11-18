import { Module } from '@nestjs/common';
import { ExpedientService } from '@expedient/services/expedient.service';
import { ExpedientController } from '@expedient/controllers/expedient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository, ResponsibleRepository } from '@students/repositories';
import { SessionService } from '@expedient/services/session.service';
import { SessionController } from '@expedient/controllers/session.controller';
import { ExpedientRepository } from '@expedient/repositories/expedient.repository';
import { SessionRepository } from '@expedient/repositories/session.repository';
import { EvaluationService } from '@expedient/services/evaluation.service';
import { EvaluationRepository } from '@expedient/repositories/evaluation.repository';
import { SessionResponsibleAssistenceRepository } from '@expedient/repositories/session-responsible-assistence.repository';
import { SessionResponsibleAssistenceService } from '@expedient/services/session-responsible-assistence.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentRepository,
      SessionRepository,
      ExpedientRepository,
      EvaluationRepository,
      ResponsibleRepository,
      SessionResponsibleAssistenceRepository,
    ]),
  ],
  providers: [ExpedientService, SessionService, EvaluationService, SessionResponsibleAssistenceService],
  controllers: [ExpedientController, SessionController],
})
export class ExpedientModule {}
