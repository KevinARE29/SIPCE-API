import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicsModule } from '@academics/academics.module';
import { StudentBulkController } from './controllers/student-bulk.controller';
import { StudentBulkService } from './services/student-bulk.service';
import { StudentRepository } from './repositories/student.repository';
import { ResponsibleStudentRepository } from './repositories/responsible-student.repository';
import { ResponsibleRepository } from './repositories/responsible.repository';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { ResponsibleController } from './controllers/responsible.controller';
import { ResponsibleService } from './services/responsible.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository, ResponsibleRepository, ResponsibleStudentRepository]),
    AcademicsModule,
  ],
  controllers: [StudentController, StudentBulkController, ResponsibleController],
  providers: [StudentService, StudentBulkService, ResponsibleService],
})
export class StudentModule {}
