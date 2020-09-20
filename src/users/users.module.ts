import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicsModule } from '@academics/academics.module';
import { MailsModule } from '@mails/mails.module';
import { UserRepository } from './repositories/users.repository';
import { UsersController, UserBulkController, MeController } from './controllers';
import { UsersService, UsersBulkService, MeService } from './services';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AcademicsModule, MailsModule],
  controllers: [UsersController, UserBulkController, MeController],
  providers: [UsersService, UsersBulkService, MeService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
