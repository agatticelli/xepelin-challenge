import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../../../account/command/create-account.command';
import { ACCOUNT_CREATED_EVENT, AccountCreatedEvent } from '../../../account/event/account-created.event';
import { EventStorageService } from '../../../shared/event-store/service';

@Injectable()
@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand> {
  constructor(
    private eventStoreService: EventStorageService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAccountCommand): Promise<void> {
    const { account } = command;

    await this.eventStoreService.saveEvent(`${account.userId}#${account.id}`, 1, ACCOUNT_CREATED_EVENT, account);
    this.eventBus.publish(new AccountCreatedEvent(account));
  }
}
