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
import { createTestAccount } from './utils/account';
import { TransactionType } from '../src/transaction/dto/create-transaction.dto';

describe('TransactionController', () => {
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

  it('creates a deposit successfully', async () => {
    // given
    const { userId, token } = await useAuth(moduleFixture);
    const queryBus = moduleFixture.get(QueryBus);
    const { accountId } = await createTestAccount(app, token);
    const depositAmount = 300;
    const createTransactionData = {
      amount: depositAmount,
      type: TransactionType.DEPOSIT,
      accountId,
    };

    // when
    const result = request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(createTransactionData);

    // then
    result.expect(201);

    const { transactionId } = (await result).body;
    expect(transactionId).not.toBeUndefined();
    const accountAggregate: Account = await queryBus.execute(new GetAccountBalanceQuery(userId, accountId));
    expect(accountAggregate.balance).toBe(depositAmount);
  });

  it('performs a withdraw successfully', async () => {
    // given
    const { userId, token } = await useAuth(moduleFixture);
    const queryBus = moduleFixture.get(QueryBus);
    const { accountId } = await createTestAccount(app, token);
    const depositAmount = 11300;
    const withdrawalAmount = 100;
    const depositTransactionData = {
      amount: depositAmount,
      type: TransactionType.DEPOSIT,
      accountId,
    };
    const withdrawalTransactionData = {
      amount: withdrawalAmount,
      type: TransactionType.WITHDRAWAL,
      accountId,
    };
    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(depositTransactionData);

    // when
    const result = request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(withdrawalTransactionData);

    // then
    await result.expect(201);

    const accountAggregate: Account = await queryBus.execute(new GetAccountBalanceQuery(userId, accountId));
    expect(accountAggregate.balance).toBe(depositAmount - withdrawalAmount);
  });

  it('fails to create deposit due to input validation', async () => {
    // given
    const { token } = await useAuth(moduleFixture);
    const { accountId } = await createTestAccount(app, token);
    const depositAmount = 300;
    const createTransactionData = {
      amount: depositAmount,
      accountId,
    };

    // when
    // when
    const result = request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(createTransactionData);

    // then
    await result.expect(400);
  });

  it('fails to create deposit due to wrong transaction type', async () => {
    // given
    const { token } = await useAuth(moduleFixture);
    const { accountId } = await createTestAccount(app, token);
    const depositAmount = 300;
    const createTransactionData = {
      amount: depositAmount,
      type: 'WRONG_TYPE',
      accountId,
    };

    // when
    // when
    const result = request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(createTransactionData);

    // then
    await result.expect(400);
  });

  it('fails to withdraw because of insufficient funds', async () => {
    // given
    const { userId, token } = await useAuth(moduleFixture);
    const queryBus = moduleFixture.get(QueryBus);
    const { accountId } = await createTestAccount(app, token);
    const depositAmount = 300;
    const withdrawalAmount = 400;
    const depositTransactionData = {
      amount: depositAmount,
      type: TransactionType.DEPOSIT,
      accountId,
    };
    const withdrawalTransactionData = {
      amount: withdrawalAmount,
      type: TransactionType.WITHDRAWAL,
      accountId,
    };
    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(depositTransactionData);

    // when
    const result = request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(withdrawalTransactionData);

    // then
    await result.expect(409);

    const accountAggregate: Account = await queryBus.execute(new GetAccountBalanceQuery(userId, accountId));
    expect(accountAggregate.balance).toBe(depositAmount);
  });
});
