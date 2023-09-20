import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from 'src/account/account.repository';
import { CreateAccountCommand } from 'src/account/command/create-account.command';
export declare class CreateAccountHandler implements ICommandHandler<CreateAccountCommand> {
    private accountRepository;
    private readonly eventBus;
    constructor(accountRepository: AccountRepository, eventBus: EventBus);
    execute(command: CreateAccountCommand): Promise<void>;
}
