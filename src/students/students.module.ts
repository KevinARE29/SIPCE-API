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
import { StudentImageService } from './services/student-image.service';
import { StudentImageController } from './controllers/student-image.controller';
import { ImageRepository } from './repositories/image.repository';
import { StudentAssignationController } from './controllers/student-assignation.controller';
import { StudentAssignationService } from './services/student-assignation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository, ResponsibleRepository, ResponsibleStudentRepository, ImageRepository]),
    AcademicsModule,
  ],
  controllers: [
    StudentController,
    StudentBulkController,
    ResponsibleController,
    StudentImageController,
    StudentAssignationController,
  ],
  providers: [StudentService, StudentBulkService, ResponsibleService, StudentImageService, StudentAssignationService],
})
export class StudentModule {}
