import { CreateAccountDTO } from './dto/create-account.dto';
import { AccountService } from './account.service';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    createAccount(createAccountData: CreateAccountDTO): Promise<{
        accountId: string;
    }>;
}
