import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DBConnection {
  private dbClient: DynamoDBClient;
  private dbDocumentClient: DynamoDBDocumentClient;

  constructor() {
    const marshallOptions = {
      convertEmptyValues: false,
      removeUndefinedValues: false,
      convertClassInstanceToMap: true,
    };

    const unmarshallOptions = {
      wrapNumbers: false,
    };

    const translateConfig = { marshallOptions, unmarshallOptions };

    this.dbClient = new DynamoDBClient({
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_ENDPOINT_URL,
    });

    this.dbDocumentClient = DynamoDBDocumentClient.from(this.dbClient, translateConfig);
  }

  getClient(): DynamoDBDocumentClient {
    return this.dbDocumentClient;
  }
}
