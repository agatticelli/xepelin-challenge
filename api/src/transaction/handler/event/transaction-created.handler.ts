import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TransactionType } from '../../../transaction/dto/create-transaction.dto';
import { TransactionCreatedEvent } from '../../../transaction/event/transaction-created.event';

@EventsHandler(TransactionCreatedEvent)
export class TransactionCreatedHandler implements IEventHandler<TransactionCreatedEvent> {
  constructor() {}

  async handle(event: TransactionCreatedEvent): Promise<void> {
    if (event.transaction.type === TransactionType.DEPOSIT && event.transaction.amount > 10000) {
      console.log('Deposit greater than 10k', JSON.stringify(event.transaction));
    }
  }
}
