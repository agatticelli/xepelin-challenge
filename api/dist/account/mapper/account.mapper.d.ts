import { AccountDTO } from '../dto/account.dto';
import { Account } from '../entity/account.entity';
export declare class AccountMapper {
    static toDTO(account: Account): AccountDTO;
    static toDomain(raw: any): Account;
    static toPersistence(account: Account): any;
}
