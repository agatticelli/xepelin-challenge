import { IsNumber, IsNotEmpty, IsEnum, IsString } from 'class-validator';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export class CreateTransactionDTO {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsString()
  @IsNotEmpty()
  accountId: number;
}
