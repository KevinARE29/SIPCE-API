import { Module } from '@nestjs/common';
import { StudentBulkController } from './controllers/student-bulk.controller';

@Module({
  controllers: [StudentBulkController],
})
export class StudentModule {}
