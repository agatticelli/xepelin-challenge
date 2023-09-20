import { IEvent } from '@nestjs/cqrs';
import { Account } from '../entity/account.entity';

export class AccountCreatedEvent implements IEvent {
  constructor(public readonly account: Account) {}
}

export const ACCOUNT_CREATED_EVENT = 'AccountCreatedEvent';
