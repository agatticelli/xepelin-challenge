import { Transaction } from '../entity/transaction.entity';

export class TransactionMapper {
  static toDomain(raw: any): Transaction {
    const transaction = new Transaction({
      amount: raw.amount,
      id: raw.transactionId,
      type: raw.type,
      accountId: raw.accountId,
      userId: raw.userId,
    });

    return transaction;
  }
}
