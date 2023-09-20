import { randomUUID } from 'crypto';
import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { CreateAccountDTO } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { AccountMapper } from './mapper/account.mapper';
import { AccountDTO } from './dto/account.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createAccount(@Request() request, @Body() createAccountData: CreateAccountDTO): Promise<{ accountId: string }> {
    const userId = request.user.sub;
    const accountId = randomUUID();

    await this.accountService.createAccount(userId, accountId, createAccountData);

    return { accountId };
  }

  @UseGuards(AuthGuard)
  @Get(':accountId/balance')
  async getBalance(@Request() request, @Param('accountId') accountId: string): Promise<AccountDTO> {
    const account = await this.accountService.getBalance(request.user.sub, accountId);

    return AccountMapper.toDTO(account);
  }
}
