import { AggregateRoot } from '@nestjs/cqrs';
import { ACCOUNT_CREATED_EVENT } from '../event/account-created.event';
import { MONEY_DEPOSITED_EVENT, MONEY_WITHDRAWN_EVENT } from '../../transaction/event/transaction-created.event';

interface IAccountEvent {
  accountId: string;
  userId: string;
  version: number;
  eventType: string;
  payload: any;
}

export class Account extends AggregateRoot<IAccountEvent> {
  private _lastVersion: number;
  id: string;
  userId: string;
  ownerFullName: string;
  number: number;
  balance: number;

  get lastVersion(): number {
    return this._lastVersion;
  }

  loadFromHistory(history: IAccountEvent[]): void {
    history.map((event) => {
      switch (event.eventType) {
        case ACCOUNT_CREATED_EVENT:
          this.id = event.accountId;
          this.userId = event.userId;
          this.ownerFullName = event.payload.ownerFullName;
          this.number = event.payload.number;
          this.balance = event.payload.balance;
          break;
        case MONEY_DEPOSITED_EVENT:
          this.balance += event.payload.amount;
          break;
        case MONEY_WITHDRAWN_EVENT:
          this.balance -= event.payload.amount;
          break;
        default:
          console.log('Unknown event type', event.eventType);
      }
    });

    this._lastVersion = history[history.length - 1].version;
  }
}
