import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountDTO } from './dto/create-account.dto';
import { Account } from './entity/account.entity';
export declare class AccountService {
    private readonly queryBus;
    private readonly commandBus;
    constructor(queryBus: QueryBus, commandBus: CommandBus);
    createAccount(userId: string, accountId: string, accountData: CreateAccountDTO): Promise<Account>;
}
