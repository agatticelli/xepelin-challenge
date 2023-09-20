import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountDTO } from './dto/create-account.dto';
import { Account } from './entity/account.entity';
import { CreateAccountCommand } from './command/create-account.command';
import { AccountMapper } from './mapper/account.mapper';
import { Injectable } from '@nestjs/common';
import { GetAccountBalanceQuery } from './query/get-account-balance.query';

@Injectable()
export class AccountService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async createAccount(userId: string, accountId: string, accountData: CreateAccountDTO): Promise<void> {
    const account = AccountMapper.toDomain({
      ...accountData,
      userId,
      accountId,
      balance: 0,
    });

    await this.commandBus.execute(new CreateAccountCommand(account));
  }

  async getBalance(userId: string, accountId: string): Promise<Account> {
    const accountAggregate: Account = await this.queryBus.execute(new GetAccountBalanceQuery(userId, accountId));

    return accountAggregate;
  }
}
