import { Module } from '@nestjs/common';
import { EtlController } from './etl.controller';
import { EtlService } from './etl.service';

@Module({
  controllers: [EtlController],
  providers: [EtlService]
})
export class EtlModule {}
