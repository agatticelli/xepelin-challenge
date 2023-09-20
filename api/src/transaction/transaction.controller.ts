import { randomUUID } from 'crypto';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(@Body() createTransactionData: CreateTransactionDTO): Promise<{ transactionId: string }> {
    const userId = 'test-user-id';
    const transactionId = randomUUID();

    await this.transactionService.createTransaction(userId, transactionId, createTransactionData);

    return { transactionId };
  }
}
