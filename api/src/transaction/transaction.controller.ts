import { randomUUID } from 'crypto';
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTransaction(
    @Request() request,
    @Body() createTransactionData: CreateTransactionDTO,
  ): Promise<{ transactionId: string }> {
    const userId = request.user.sub;
    const transactionId = randomUUID();

    await this.transactionService.createTransaction(userId, transactionId, createTransactionData);

    return { transactionId };
  }
}
