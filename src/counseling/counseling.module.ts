import { AcademicsModule } from '@academics/academics.module';
import { MailsModule } from '@mails/mails.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '@students/students.module';
import { CounselingRequestsController } from './controllers/counseling-requests.controller';
import { MeRequestsController } from './controllers/me-requests.controller';
import { RequestGateway } from './gateways/request.gateway';
import { RequestRepository } from './repositories/request.repository';
import { RequestService } from './services/request.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestRepository]), MailsModule, StudentModule, AcademicsModule],
  controllers: [CounselingRequestsController, MeRequestsController],
  providers: [RequestService, RequestGateway],
  exports: [TypeOrmModule],
})
export class CounselingModule {}
