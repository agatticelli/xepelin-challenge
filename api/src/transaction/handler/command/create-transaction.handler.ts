import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EventStorageService } from '../../../shared/event-store/service';
import { CreateTransactionCommand } from '../../../transaction/command/create-transaction.command';
import { TransactionType } from '../../../transaction/dto/create-transaction.dto';
import {
  MONEY_DEPOSITED_EVENT,
  MONEY_WITHDRAWN_EVENT,
  TransactionCreatedEvent,
} from '../../../transaction/event/transaction-created.event';

@Injectable()
@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<CreateTransactionCommand> {
  constructor(
    private eventStoreService: EventStorageService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<void> {
    const { transaction, account } = command;

    let eventName: string = '';
    switch (transaction.type) {
      case TransactionType.DEPOSIT:
        eventName = MONEY_DEPOSITED_EVENT;
        break;
      case TransactionType.WITHDRAWAL:
        eventName = MONEY_WITHDRAWN_EVENT;
        break;
      default:
        throw new Error('Invalid transaction type');
    }

    await this.eventStoreService.saveEvent(
      `${transaction.userId}#${transaction.accountId}`,
      account.lastVersion + 1,
      eventName,
      transaction,
    );

    this.eventBus.publish(new TransactionCreatedEvent(transaction));
  }
}
