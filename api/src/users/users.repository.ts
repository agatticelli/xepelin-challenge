import { DBConnection } from '../shared/database.provider';
import { Injectable } from '@nestjs/common';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { User } from './entity/user.entity';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserRepository {
  constructor(private dbConnection: DBConnection) {}

  async find(username: string): Promise<User | undefined> {
    const user = await this.dbConnection.getDocumentClient().send(
      new QueryCommand({
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: 'pk = :pk and sk = :sk',
        ExpressionAttributeValues: {
          ':pk': `USER#${username}`,
          ':sk': `USER#${username}`,
        },
      }),
    );

    if (!user.Items?.length) return;

    return UserMapper.fromPersistence(user.Items[0]);
  }

  async create(user: User): Promise<void> {
    await this.dbConnection.getDocumentClient().send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: UserMapper.toPersistence(user),
      }),
    );
  }
}
