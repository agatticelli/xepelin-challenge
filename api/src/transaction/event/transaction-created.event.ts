import { IEvent } from '@nestjs/cqrs';
import { Transaction } from '../entity/transaction.entity';

export class TransactionCreatedEvent implements IEvent {
  constructor(public readonly transaction: Transaction) {}
}

export const MONEY_DEPOSITED_EVENT = 'MoneyDepositedEvent';
export const MONEY_WITHDRAWN_EVENT = 'MoneyWithdrawnEvent';
