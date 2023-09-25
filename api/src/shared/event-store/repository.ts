import { Injectable } from '@nestjs/common';
import { DBConnection } from '../database.provider';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { EventStoreMapper } from './mapper';
import { StreamIdNotFoundError } from './custom-errors';

@Injectable()
export class EventStorageRepository {
  constructor(private dbConnection: DBConnection) {}

  async saveEvent(streamId: string, version: number, eventType: string, payload: any): Promise<void> {
    const item = EventStoreMapper.toPersistence(streamId, version, eventType, payload);
    await this.dbConnection.getDocumentClient().send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: item,
      }),
    );
  }

  async getEvents(streamId: string) {
    const result = await this.dbConnection.getDocumentClient().send(
      new QueryCommand({
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
          ':pk': `EVENT#${streamId}`,
        },
      }),
    );

    if (!result.Items.length) throw new StreamIdNotFoundError(streamId);

    return result.Items.map((item) => EventStoreMapper.fromPersistence(item));
  }
}
