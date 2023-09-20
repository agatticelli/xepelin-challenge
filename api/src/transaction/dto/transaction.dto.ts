import { TransactionType } from './create-transaction.dto';

export interface TransactionDTO {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  accountId: string;
}
