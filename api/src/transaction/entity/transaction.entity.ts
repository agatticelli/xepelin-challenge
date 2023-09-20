import { AggregateRoot } from '@nestjs/cqrs';
import { TransactionType } from '../dto/create-transaction.dto';

interface ITransactionProps {
  id: string;
  userId: string;
  accountId: string;
  amount: number;
  type: TransactionType;
}

export class Transaction extends AggregateRoot {
  id: string;
  userId: string;
  amount: number;
  accountId: string;
  type: TransactionType;

  constructor(props: ITransactionProps) {
    super();
    this.id = props.id;
    this.userId = props.userId;
    this.amount = props.amount;
    this.accountId = props.accountId;
    this.type = TransactionType[props.type];
  }
}
