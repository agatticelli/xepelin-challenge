import { ICommand } from '@nestjs/cqrs';
import { Transaction } from '../entity/transaction.entity';
import { Account } from '../../account/entity/account.entity';

export class CreateTransactionCommand implements ICommand {
  constructor(
    public readonly account: Account,
    public readonly transaction: Transaction,
  ) {}
}
