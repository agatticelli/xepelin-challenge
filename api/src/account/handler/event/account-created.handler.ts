import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { AccountCreatedEvent } from '../../../account/event/account-created.event';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler implements IEventHandler<AccountCreatedEvent> {
  constructor() {}

  async handle(event: AccountCreatedEvent): Promise<void> {
    // do stuff
  }
}
