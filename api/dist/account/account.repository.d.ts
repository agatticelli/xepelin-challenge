import { Account } from './entity/account.entity';
import { DBConnection } from 'src/shared/database.provider';
export declare class AccountRepository {
    private dbConnection;
    constructor(dbConnection: DBConnection);
    create(account: Account): Promise<void>;
}
