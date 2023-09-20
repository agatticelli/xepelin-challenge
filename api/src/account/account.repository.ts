import { Account } from './entity/account.entity';
import { AccountMapper } from './mapper/account.mapper';
import { DBConnection } from 'src/shared/database.provider';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository {
  constructor(private dbConnection: DBConnection) {}

  async create(account: Account): Promise<void> {
    console.log('AccountRepository.create()', account, AccountMapper.toPersistence(account));
    await this.dbConnection.getClient().send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: AccountMapper.toPersistence(account),
      }),
    );
  }
}
