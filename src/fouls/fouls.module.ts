import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoulsController } from '@fouls/controllers/fouls.controller';
import { FoulsRepository } from '@fouls/repository/fouls.repository';
import { FoulsService } from '@fouls/services/fouls.service';


@Module({
  imports: [TypeOrmModule.forFeature([FoulsRepository])],
  controllers: [FoulsController],
  providers: [FoulsService],
})
export class FoulsModule {}
