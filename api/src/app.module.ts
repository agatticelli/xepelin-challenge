import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AccountModule, TransactionModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
