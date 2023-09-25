import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { StartedTestContainer } from 'testcontainers';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { QueryBus } from '@nestjs/cqrs';
import { Account } from '../src/account/entity/account.entity';
import { GetAccountBalanceQuery } from '../src/account/query/get-account-balance.query';
import { createTestTable, deleteTestTable, startDatabaseContainer, useDatabaseConnection } from './utils/database';
import { useAuth } from './utils/auth';

describe('AccountController', () => {
  let startedContainer: StartedTestContainer;
  let dbClient: DynamoDBClient;
  let dbDocumentClient: DynamoDBDocumentClient;
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    startedContainer = await startDatabaseContainer();

    const { dbClient: _dbClient, dbDocumentClient: _dbDocumentClient } = await useDatabaseConnection(startedContainer);
    dbClient = _dbClient;
    dbDocumentClient = _dbDocumentClient;
  }, 30000);

  afterAll(async () => {
    await Promise.allSettled([dbDocumentClient.destroy(), dbClient.destroy(), startedContainer.stop()]);
  });

  beforeEach(async () => {
    await createTestTable(dbClient);

    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await deleteTestTable(dbClient);
    await app.close();
  });

  it('creates an account successfully', async () => {
    // given
    const { userId, token } = await useAuth(moduleFixture);
    const queryBus = moduleFixture.get(QueryBus);
    const createAccountData = {
      ownerFullName: 'Test Account',
      number: 237482374,
    };

    // when
    const result = request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(createAccountData);

    // then
    result.expect(201);
    const { accountId } = (await result).body;
    expect(accountId).not.toBeUndefined();
    const accountAggregate: Account = await queryBus.execute(new GetAccountBalanceQuery(userId, accountId));
    expect(accountAggregate).toMatchObject({
      id: accountId,
      userId,
      ownerFullName: 'Test Account',
      number: 237482374,
      balance: 0,
    });
  });

  it('fails to create account due to input validation', async () => {
    // given
    const { token } = await useAuth(moduleFixture);
    const createAccountData = {
      number: 237482374,
    };

    // when
    const result = request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(createAccountData);

    // then
    result.expect(400);
  });

  it('gets account balance successfully', async () => {
    // given
    const { token } = await useAuth(moduleFixture);
    const createAccountData = {
      ownerFullName: 'Test Account',
      number: 237482374,
    };

    const createResult = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(createAccountData);

    const { accountId } = createResult.body;

    // when
    const result = request(app.getHttpServer())
      .get(`/accounts/${accountId}/balance`)
      .set('Authorization', `Bearer ${token}`);

    // then
    result.expect(200);
    const { balance } = (await result).body;
    expect(balance).toBe(0);
  });

  it('fails to get account balance due to invalid account id', async () => {
    // given
    const { token } = await useAuth(moduleFixture);

    // when
    const result = request(app.getHttpServer())
      .get(`/accounts/invalid-account-id/balance`)
      .set('Authorization', `Bearer ${token}`);

    // then
    await result.expect(404);
  });

  it('fails to get account balance due to unauthorized access', async () => {
    // given
    const { token } = await useAuth(moduleFixture);
    const createAccountData = {
      ownerFullName: 'Test Account',
      number: 237482374,
    };

    const createResult = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(createAccountData);

    const { accountId } = createResult.body;

    // when
    const result = request(app.getHttpServer())
      .get(`/accounts/${accountId}/balance`)
      .set('Authorization', `Bearer invalid-token`);

    // then
    await result.expect(401);
  });
});
