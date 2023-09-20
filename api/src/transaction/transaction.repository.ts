import { Transaction } from './entity/transaction.entity';
import { TransactionMapper } from './mapper/transaction.mapper';
import { DBConnection } from 'src/shared/database.provider';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository {
  constructor(private dbConnection: DBConnection) {}

  async create(transaction: Transaction): Promise<void> {
    await this.dbConnection.getClient().send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: TransactionMapper.toPersistence(transaction),
      }),
    );
  }
}
