import { IEvent } from '@nestjs/cqrs';
import { Account } from '../entity/account.entity';
export declare class AccountCreatedEvent implements IEvent {
    readonly account: Account;
    constructor(account: Account);
}
export declare const ACCOUNT_CREATED_EVENT = "AccountCreatedEvent";
