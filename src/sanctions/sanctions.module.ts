import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanctionsController } from '@sanctions/controllers/sanctions.controller';
import { SanctionsService } from '@sanctions/services/sanctions.service';
import { SanctionsRepository } from '@sanctions/repository/sanctions.repository';
@Module({
  imports: [TypeOrmModule.forFeature([SanctionsRepository])],
  controllers: [SanctionsController],
  providers: [SanctionsService],
})
export class SanctionsModule {}
