import { AcademicsModule } from '@academics/academics.module';
import { MailsModule } from '@mails/mails.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '@students/students.module';
import { RequestController } from './controllers/request.controller';
import { RequestRepository } from './repositories/request.repository';
import { RequestService } from './services/request.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestRepository]), MailsModule, StudentModule, AcademicsModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [TypeOrmModule],
})
export class CounselingModule {}
