import { Module } from '@nestjs/common';
import { ExpedientService } from '@expedient/services/expedient.service';
import { ExpedientController } from '@expedient/controllers/expedient.controller';

@Module({
  providers: [ExpedientService],
  controllers: [ExpedientController],
})
export class ExpedientModule {}
