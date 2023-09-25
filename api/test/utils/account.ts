import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { randomInt, randomUUID } from 'crypto';

export const createTestAccount = async (app: INestApplication, token: string): Promise<{ accountId: string }> => {
  const createAccountDto = {
    ownerFullName: `Test Account ${randomUUID()}`,
    number: randomInt(100000000, 999999999),
  };
  const createResult = await request(app.getHttpServer())
    .post('/accounts')
    .set('Authorization', `Bearer ${token}`)
    .send(createAccountDto);

  return createResult.body;
};
