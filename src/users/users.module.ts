import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicsModule } from '@academics/academics.module';
import { MailsModule } from '@mails/mails.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserRepository } from './repositories/users.repository';
import { UserBulkController } from './controllers/user-bulk.controller';
import { UsersBulkService } from './services/users-bulk.service';
import { MeController } from './controllers/me.controller';
import { MeService } from './services/me.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AcademicsModule, MailsModule],
  controllers: [UsersController, UserBulkController, MeController],
  providers: [UsersService, UsersBulkService, MeService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
