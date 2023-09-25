import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { CreateAccountHandler } from './handler/command/create-account.handler';
import { SharedModule } from '../shared/shared.module';
import { AccountCreatedHandler } from './handler/event/account-created.handler';
import { GetAccountBalanceHandler } from './handler/query/get-account-balance.handler';

@Module({
  imports: [SharedModule, CqrsModule],
  controllers: [AccountController],
  providers: [AccountService, CreateAccountHandler, AccountCreatedHandler, GetAccountBalanceHandler],
})
export class AccountModule {}
