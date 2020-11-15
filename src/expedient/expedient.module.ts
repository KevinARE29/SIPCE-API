import { Module } from '@nestjs/common';
import { ExpedientService } from '@expedient/services/expedient.service';
import { ExpedientController } from '@expedient/controllers/expedient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from '@students/repositories';
import { SessionService } from '@expedient/services/session.service';
import { SessionController } from '@expedient/controllers/session.controller';
import { ExpedientRepository } from '@expedient/repositories/expedient.repository';
import { SessionRepository } from '@expedient/repositories/session.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository, SessionRepository, ExpedientRepository])],
  providers: [ExpedientService, SessionService],
  controllers: [ExpedientController, SessionController],
})
export class ExpedientModule {}
