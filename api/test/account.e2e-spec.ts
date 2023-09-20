import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GenericContainer, StartedTestContainer, TestContainer } from 'testcontainers';
import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

describe('AccountController', () => {
  let startedContainer: StartedTestContainer;
  let dbClient: DynamoDBClient;
  let dbDocumentClient: DynamoDBDocumentClient;
  let tableDefinition;
  let app: INestApplication;

  beforeAll(async () => {
    const marshallOptions = {
      convertEmptyValues: false,
      removeUndefinedValues: false,
      convertClassInstanceToMap: true,
    };

    const unmarshallOptions = {
      wrapNumbers: false,
    };

    const translateConfig = { marshallOptions, unmarshallOptions };
    tableDefinition = JSON.parse(fs.readFileSync('../database/migrations.json', 'utf8'));

    startedContainer = await new GenericContainer('amazon/dynamodb-local').withExposedPorts(8000).start();
    dbClient = new DynamoDBClient({
      region: process.env.AWS_REGION,
      endpoint: `http://localhost:${startedContainer.getMappedPort(8000)}`,
    });

    dbDocumentClient = DynamoDBDocumentClient.from(dbClient, translateConfig);
    await dbClient.send(new CreateTableCommand(tableDefinition));
  }, 30000);

  afterAll(async () => {
    await dbDocumentClient.destroy();
    await dbClient.destroy();
    await startedContainer.stop();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('creates an account', async () => {
    request(app.getHttpServer().post('/accounts')).send({ name: 'test' }).expect(201);
  });
});

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
//   });
// });
