import { TransactionDTO } from '../dto/transaction.dto';
import { Transaction } from '../entity/transaction.entity';

export class TransactionMapper {
  static toDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      userId: transaction.userId,
      accountId: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
    };
  }

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

  static toPersistence(transaction: Transaction): any {
    return {
      pk: `TRANSACTION#${transaction.id}`,
      sk: `TRANSACTION#${transaction.id}`,
      userId: transaction.userId,
      type: transaction.type,
      amount: transaction.amount,
      accountId: transaction.accountId,
    };
  }
}
