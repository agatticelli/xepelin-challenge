import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTransactionDTO, TransactionType } from './dto/create-transaction.dto';
import { CreateTransactionCommand } from './command/create-transaction.command';
import { TransactionMapper } from './mapper/transaction.mapper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAccountBalanceQuery } from 'src/account/query/get-account-balance.query';

@Injectable()
export class TransactionService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async createTransaction(userId: string, transactionId: string, transactionData: CreateTransactionDTO): Promise<void> {
    const transaction = TransactionMapper.toDomain({
      ...transactionData,
      userId,
      transactionId,
    });

    const account = await this.queryBus.execute(new GetAccountBalanceQuery(userId, transaction.accountId));

    if (transaction.type === TransactionType.WITHDRAWAL && account.balance < transaction.amount) {
      throw new HttpException('Insufficient funds', HttpStatus.CONFLICT);
    }

    await this.commandBus.execute(new CreateTransactionCommand(account, transaction));
  }
}
