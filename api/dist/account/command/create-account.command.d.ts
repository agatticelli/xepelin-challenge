import { ICommand } from '@nestjs/cqrs';
import { Account } from '../entity/account.entity';
export declare class CreateAccountCommand implements ICommand {
    readonly account: Account;
    constructor(account: Account);
}
