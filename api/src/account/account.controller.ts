import { randomUUID } from 'crypto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateAccountDTO } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { AccountMapper } from './mapper/account.mapper';
import { AccountDTO } from './dto/account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async createAccount(
    @Body() createAccountData: CreateAccountDTO,
    // @Request() request,
  ): Promise<{ accountId: string }> {
    const userId = 'test-user-id';
    const accountId = randomUUID();

    await this.accountService.createAccount(userId, accountId, createAccountData);

    return { accountId };
  }

  @Get(':accountId/balance')
  async getBalance(@Param('accountId') accountId: string): Promise<AccountDTO> {
    const account = await this.accountService.getBalance('test-user-id', accountId);

    return AccountMapper.toDTO(account);
  }
}
