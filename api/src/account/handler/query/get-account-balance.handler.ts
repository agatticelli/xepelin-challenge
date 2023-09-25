import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Account } from '../../../account/entity/account.entity';
import { GetAccountBalanceQuery } from '../../../account/query/get-account-balance.query';
import { EventStorageService } from '../../../shared/event-store/service';
import { StreamIdNotFoundError } from '../../../shared/event-store/custom-errors';
import { AccountNotFoundError } from '../../../account/custom-errors';

@QueryHandler(GetAccountBalanceQuery)
export class GetAccountBalanceHandler implements IQueryHandler<GetAccountBalanceQuery> {
  constructor(private readonly eventStoreService: EventStorageService) {}

  async execute(query: GetAccountBalanceQuery): Promise<Account> {
    try {
      const events = await this.eventStoreService.getEvents(`${query.userId}#${query.accountId}`);

      const account = new Account();
      account.loadFromHistory(events);

      return account;
    } catch (err) {
      if (err instanceof StreamIdNotFoundError) {
        throw new AccountNotFoundError(query.accountId);
      }

      throw err;
    }
  }
}
