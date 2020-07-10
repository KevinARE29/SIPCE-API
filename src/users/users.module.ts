import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicsModule } from '@academics/academics.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserRepository } from './repositories/users.repository';
import { UserBulkController } from './controllers/user-bulk.controller';
import { AdministrativeBulkService } from './services/administrative-bulk.service';
import { CoordinatorBulkService } from './services/coordinator-bulk.service';
import { TeacherBulkService } from './services/teacher-bulk.service';
import { CounselorBulkService } from './services/counselor-bulk.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AcademicsModule],
  controllers: [UsersController, UserBulkController],
  providers: [
    UsersService,
    AdministrativeBulkService,
    CoordinatorBulkService,
    CounselorBulkService,
    TeacherBulkService,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
