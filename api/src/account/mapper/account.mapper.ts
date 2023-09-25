import { AccountDTO } from '../dto/account.dto';
import { Account } from '../entity/account.entity';

export class AccountMapper {
  static toDTO(account: Account): AccountDTO {
    return {
      id: account.id,
      userId: account.userId,
      ownerFullName: account.ownerFullName,
      number: account.number,
      balance: account.balance,
    };
  }

  static toDomain(raw: any): Account {
    const account = new Account();
    account.ownerFullName = raw.ownerFullName;
    account.number = raw.number;
    account.balance = raw.balance;
    account.id = raw.accountId;
    account.userId = raw.userId;

    return account;
  }
}
