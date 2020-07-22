import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicsModule } from '@academics/academics.module';
import { StudentBulkController } from './controllers/student-bulk.controller';
import { StudentBulkService } from './services/student-bulk.service';
import { StudentRepository } from './repositories/student.repository';
import { ResponsibleStudentRepository } from './repositories/responsible-student.repository';
import { ResponsibleRepository } from './repositories/responsible.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository, ResponsibleRepository, ResponsibleStudentRepository]),
    AcademicsModule,
  ],
  controllers: [StudentBulkController],
  providers: [StudentBulkService],
})
export class StudentModule {}
