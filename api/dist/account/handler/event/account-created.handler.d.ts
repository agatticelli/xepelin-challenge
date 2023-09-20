import { IEventHandler } from '@nestjs/cqrs';
import { AccountCreatedEvent } from 'src/account/event/account-created.event';
import { EventStorageService } from 'src/shared/event-store/service';
export declare class AccountCreatedHandler implements IEventHandler<AccountCreatedEvent> {
    private eventStoreService;
    constructor(eventStoreService: EventStorageService);
    handle(event: AccountCreatedEvent): Promise<void>;
}
