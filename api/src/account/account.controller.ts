import { randomUUID } from 'crypto';
import { Controller, Post, Body, Get, Param, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAccountDTO } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { AccountMapper } from './mapper/account.mapper';
import { AccountDTO } from './dto/account.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AccountNotFoundError } from './custom-errors';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createAccount(@Body() createAccountData: CreateAccountDTO, @Request() request): Promise<{ accountId: string }> {
    const userId = request.user.sub;
    const accountId = randomUUID();

    await this.accountService.createAccount(userId, accountId, createAccountData);

    return { accountId };
  }

  @Get(':accountId/balance')
  @UseGuards(AuthGuard)
  async getBalance(@Request() request, @Param('accountId') accountId: string): Promise<AccountDTO> {
    try {
      const account = await this.accountService.getBalance(request.user.sub, accountId);

      return AccountMapper.toDTO(account);
    } catch (err) {
      if (err instanceof AccountNotFoundError) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }
}
