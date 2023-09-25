import * as fs from 'fs';
import { CreateTableCommand, DeleteTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { randomInt } from 'crypto';

const tableDefinition = JSON.parse(fs.readFileSync('../database/migrations.json', 'utf8'));

export const startDatabaseContainer = async () => {
  const randomPort = randomInt(1000, 9999);
  const container = await new GenericContainer('amazon/dynamodb-local')
    .withExposedPorts({ container: 8000, host: randomPort })
    .start();

  process.env.AWS_ENDPOINT_URL = `http://${container.getHost()}:${container.getMappedPort(8000)}`;

  return container;
};

export const useDatabaseConnection = async (container: StartedTestContainer) => {
  const marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: false,
    convertClassInstanceToMap: true,
  };

  const unmarshallOptions = {
    wrapNumbers: false,
  };

  const translateConfig = { marshallOptions, unmarshallOptions };

  const dbClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
    endpoint: `http://${container.getHost()}:${container.getMappedPort(8000)}`,
  });

  const dbDocumentClient = DynamoDBDocumentClient.from(dbClient, translateConfig);

  return { dbClient, dbDocumentClient };
};

export const createTestTable = async (dbClient: DynamoDBClient) => {
  await dbClient.send(new CreateTableCommand(tableDefinition));
  process.env.TABLE_NAME = tableDefinition.TableName;
};

export const deleteTestTable = async (dbClient: DynamoDBClient) => {
  await dbClient.send(
    new DeleteTableCommand({
      TableName: tableDefinition.TableName,
    }),
  );
};
