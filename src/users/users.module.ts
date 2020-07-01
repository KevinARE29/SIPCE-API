import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserRepository } from './repositories/users.repository';
import { UserBulkController } from './controllers/user-bulk.controller';
import { AdministrativeBulkService } from './services/administrative-bulk.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController, UserBulkController],
  providers: [UsersService, AdministrativeBulkService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
