import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
