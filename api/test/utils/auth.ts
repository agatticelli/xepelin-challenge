import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

export const useAuth = async (moduleFixture: TestingModule) => {
  const jwtService = moduleFixture.get(JwtService);
  const userId = randomUUID();
  const token = await jwtService.signAsync({ sub: userId });
  return { userId, token };
};
