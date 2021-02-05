import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanctionsController } from '@sanctions/controllers/sanctions.controller';
import { SanctionsService } from '@sanctions/services/sanctions.service';
import { SanctionsRepository } from '@sanctions/repository/sanctions.repository';
import { SchoolYearRepository } from '@academics/repositories';
@Module({
  imports: [TypeOrmModule.forFeature([SanctionsRepository, SchoolYearRepository])],
  controllers: [SanctionsController],
  providers: [SanctionsService],
})
export class SanctionsModule {}
