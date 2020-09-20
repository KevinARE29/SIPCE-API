import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicsModule } from '@academics/academics.module';
import {
  StudentController,
  StudentBulkController,
  ResponsibleController,
  StudentImageController,
  StudentAssignationController,
} from './controllers';
import {
  StudentService,
  StudentBulkService,
  ResponsibleService,
  StudentImageService,
  StudentAssignationService,
} from './services';
import {
  StudentRepository,
  ResponsibleRepository,
  ResponsibleStudentRepository,
  ImageRepository,
} from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository, ResponsibleRepository, ResponsibleStudentRepository, ImageRepository]),
    forwardRef(() => AcademicsModule),
  ],
  controllers: [
    StudentController,
    StudentBulkController,
    ResponsibleController,
    StudentImageController,
    StudentAssignationController,
  ],
  providers: [StudentService, StudentBulkService, ResponsibleService, StudentImageService, StudentAssignationService],
  exports: [TypeOrmModule],
})
export class StudentModule {}
