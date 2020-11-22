import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoulSanctionAssignationController } from './controllers/foul-sanction-assignation.controller';
import { FoulSanctionAssignationRepository } from './repository/foul-sanction-assignation.repository';
import { FoulSanctionAssignationService } from './services/foul-sanction-assignation.service';
@Module({
  imports: [TypeOrmModule.forFeature([FoulSanctionAssignationRepository])],
  controllers: [FoulSanctionAssignationController],
  providers: [FoulSanctionAssignationService],
})
export class HistoryModule {}
