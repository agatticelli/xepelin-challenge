import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Account } from 'src/account/entity/account.entity';
import { GetAccountBalanceQuery } from 'src/account/query/get-account-balance.query';
import { EventStorageService } from 'src/shared/event-store/service';

@QueryHandler(GetAccountBalanceQuery)
export class GetAccountBalanceHandler implements IQueryHandler<GetAccountBalanceQuery> {
  constructor(private readonly eventStoreService: EventStorageService) {}

  async execute(query: GetAccountBalanceQuery): Promise<Account> {
    const events = await this.eventStoreService.getEvents(`${query.userId}#${query.accountId}`);

    const account = new Account();
    account.loadFromHistory(events);

    return account;
  }
}
